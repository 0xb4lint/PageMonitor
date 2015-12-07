var request		= require('sync-request');
var cheerio		= require('cheerio');
var fs			= require('fs');
var path		= require('path');
var low			= require('lowdb');
var nodemailer	= require('nodemailer');
var emailConfig	= require(__dirname + '/../email');

var db			= low(__dirname + '/../db.json');
var queue		= [];
var transporter	= nodemailer.createTransport( emailConfig.transporter );



var createMail = function ( mail, items ) {

	mail.html += '<ul>' + "\n";

		for ( var i in items ) {

			var item = items[ i ];

			mail.html += '<li>' + "\n";

				mail.html += '<b>' + item.name + '</b>' + "\n";
				mail.html += '<ul>' + "\n";

					if ( item.image )
						mail.html += '<li><img src="' + item.image + '"></li>' + "\n";

					mail.html += '<li>#' + item.id + '</li>' + "\n";
					mail.html += '<li><a href="' + item.link + '">' + item.link + '</a></li>' + "\n";

					for ( var j in item ) {

						if ( j === 'name' || j === 'id' || j === 'link' || j === 'image' || !item[ j ] )
							continue;

						mail.html += '<li>' + j + ': <b>' + item[ j ] + '</b></li>' + "\n";
					}

				mail.html += '</ul>' + "\n";

			mail.html += '</li>' + "\n";
		}

	mail.html += '</ul>' + "\n";
}



var parse = function ( config, url, email ) {

	console.log( new Date().toLocaleString() );
	console.log( config.name + ' - ' + email );

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
	var newItems		= [];
	var updatedItems	= [];

	for ( var i in items ) {

		var item	= items[ i ];
		var found	= db( config.name + '-' + email ).find({ id: item.id });

		if ( !found ) {

			db( config.name + '-' + email ).push( item );
			newItems.push( item );

		} else if ( JSON.stringify( item ) !== JSON.stringify( found ) ) {

			for ( var j in item )
				found[ j ] = item[ j ];

			updatedItems.push( item );
		}
	}

	console.log( 'found', items.length );
	console.log( 'new', newItems.length );
	console.log( 'updated', updatedItems.length );
	console.log('===========');

	if ( email && ( newItems.length || updatedItems.length ) ) {

		var mail = JSON.parse(JSON.stringify( emailConfig.config ));

		mail.subject	+= ' ' + config.name;
		mail.to			= email;
		mail.html		= '';

		if ( newItems.length ) {

			mail.html += '<h1>NEW</h1>' + "\n";
			createMail( mail, newItems );
		}

		if ( newItems.length && updatedItems.length ) {

			mail.html += '<br>' + "\n";
			mail.html += '<br>' + "\n";
		}

		if ( updatedItems.length ) {

			mail.html += '<h1>UPDATED</h1>' + "\n";
			createMail( mail, updatedItems );
		}

		transporter.sendMail(mail, function(error, info) {

			if ( error ) {

				console.error( error );


				////////////////
				// "ROLLBACK" //
				////////////////

				// remove new items
				for ( var i in newItems )
					db( config.name + '-' + email ).remove({ id: newItems[ i ].id });

				// fake update updated items
				for ( var i in updatedItems )
					db( config.name + '-' + email ).find({ id: updatedItems[ i ].id }).link += Math.random();
			}
		});
	}
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
