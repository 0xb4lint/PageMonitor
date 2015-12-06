var request	= require('sync-request');
var cheerio	= require('cheerio');
var fs		= require('fs');
var path	= require('path');
var low		= require('lowdb');

var db		= low('db.json');
var queue	= [];



var parse = function ( config, url, email ) {

	// make the request
	var response = request('GET', url, { timeout: 15 * 1000 });

	// load jQuery
	var $ = cheerio.load( response.getBody( config.options && config.options.encoding ? config.options.encoding : 'utf-8' ) );

	// empty array
	var items = [];

	// may be useful
	var scripts = $('script');

	// loop through items
	$( config.selector ).each(function() {

		// get attributes
		var item = {};
		for ( var attribute in config.attributes ) {

			var attributeConfig		= config.attributes[ attribute ];
			var element				= attributeConfig.selector ? $(this).find( attributeConfig.selector ) : $(this);

			item[ attribute ]	= element.length ? attributeConfig.value( element, scripts ) : null;
		}

		if ( !item.id )
			item.id = item.link;

		// add to array
		items.push( item );
	});

	// check items in database
	var newItems		= 0;
	var updatedItems	= 0;

	for ( var i in items ) {

		var item	= items[ i ];
		var found	= db( config.name + '-' + email ).find({ id: item.id });

		if ( !found ) {

			db( config.name + '-' + email ).push( item );
			newItems++;

		} else if ( JSON.stringify( item ) !== JSON.stringify( found ) ) {

			for ( var j in item )
				found[ j ] = item[ j ];

			updatedItems++;
		}
	}

	console.log( new Date().toLocaleString() );
	console.log( config.name + ' - ' + email );
	console.log( 'found', items.length );
	console.log( 'new', newItems );
	console.log( 'updated', updatedItems );
	console.log('===========');
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
