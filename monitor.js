var request	= require('request');
var cheerio	= require('cheerio');
var fs		= require('fs');
var path	= require('path');

var queue	= [];



var _diff = function ( A, B ) {

	return A.filter(function( a ) {

		for ( var i in B )
			if ( B[i].link === a.link )
				return false;

		return true;
	});
};



var parse = function ( config, url, email ) {

	// JSON database
	var jsonFile = path.resolve(__dirname, 'storage/' + config.name + '-' + email + '.json');

	// create if not exists
	if ( !fs.existsSync( jsonFile ) )
		fs.writeFileSync( jsonFile, JSON.stringify( [] ) );

	// load database
	var database = JSON.parse( fs.readFileSync( jsonFile ) );

	// make the request
	request({

		url:		url,
		timeout:	15 * 1000,
		encoding:	config.options && config.options.encoding ? config.options.encoding : 'utf-8'

	}, function(error, response, body) {

		if ( error )
			throw error;

		// load jQuery
		var $ = cheerio.load( body );

		// empty array
		var found = [];

		// may be useful
		var scripts = $('script');

		// loop through items
		$( config.selector ).each(function() {

			// get attributes
			var attributes = {};
			for ( var attribute in config.attributes ) {

				var attributeConfig		= config.attributes[ attribute ];
				var element				= $(this).find( attributeConfig.selector );

				attributes[ attribute ]	= element.length ? attributeConfig.value( element, scripts ) : null;
			}

			// add to array
			found.push( attributes );
		});


		// diff
		var diff = _diff( found, database );

		console.log( new Date().toLocaleString() );
		console.log( config.name + ' - ' + email );
		console.log( 'found', found.length );
		console.log( 'new', diff.length );

		database = database.concat( diff );

		// write to database
		fs.writeFileSync( jsonFile, JSON.stringify( database, null, "\t" ) );

		console.log('===========');
	});
};



var processNext = function() {

	if ( typeof queue[0] === 'undefined' )
		return;

	try {

		parse( queue[0].config, queue[0].url, queue[0].email );

	} catch ( err ) {

		console.error( err.stack );

	} finally {

		queue.splice(0, 1);
		processNext();
	}
};



var addToQueue = function ( data ) {

	queue.push( data );

	if ( queue.length === 1 )
		processNext();
};



module.exports = {

	index: function ( data ) {

		if ( !data.enabled )
			return;

		addToQueue( data );
		setInterval( addToQueue, data.interval * 60 * 1000, data );
	}
};
