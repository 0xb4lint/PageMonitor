var request			= require('sync-request');
var cheerio			= require('cheerio');
var fs				= require('fs');
var path			= require('path');
var low				= require('lowdb');
var moment			= require('moment');
var mandrill		= require('mandrill-api/mandrill');

var appConfig		= require(__dirname + '/../config');

var queue			= [];
var db				= low(__dirname + '/../db.json');
var mandrillClient	= new mandrill.Mandrill( appConfig.mandrill.apiKey );



var rollback = function ( config, email, newItems, updatedItems ) {

	try {

		// remove new items
		for ( var i in newItems )
			db( config.name + '-' + email ).remove({ id: newItems[ i ].id });

		// fake update updated items
		for ( var i in updatedItems )
			db( config.name + '-' + email ).find({ id: updatedItems[ i ].id }).link += Math.random();

	} catch ( err ) {

		console.error( err );
	}
};



var createMailHtmlFromItems = function ( items ) {

	var html = '';

	html += '<ul>' + "\n";

	for ( var i in items ) {

		var item = items[ i ];

		html += '<li>' + "\n";

			html += '<b>' + item.name + '</b>' + "\n";
			html += '<ul>' + "\n";

				if ( item.image )
					html += '<li><img src="' + item.image + '"></li>' + "\n";

				html += '<li>#' + item.id + '</li>' + "\n";
				html += '<li><a href="' + item.link + '">' + item.link + '</a></li>' + "\n";

				for ( var j in item ) {

					if ( j === 'name' || j === 'id' || j === 'link' || j === 'image' || !item[ j ] )
						continue;

					html += '<li>' + j + ': <b>' + item[ j ] + '</b></li>' + "\n";
				}

			html += '</ul>' + "\n";

		html += '</li>' + "\n";
	}

	html += '</ul>' + "\n";

	return html;
};



var sendMail = function ( config, url, email, newItems, updatedItems ) {

	if ( !email || ( !newItems.length && !updatedItems.length ) )
		return;

	try {

		var html = '';

		if ( newItems.length ) {

			html += '<h1>NEW</h1>' + "\n";
			html += createMailHtmlFromItems( newItems );
		}

		if ( newItems.length && updatedItems.length ) {

			html += '<br>' + "\n";
			html += '<br>' + "\n";
		}

		if ( updatedItems.length ) {

			html += '<h1>UPDATED</h1>' + "\n";
			html += createMailHtmlFromItems( updatedItems );
		}

		html += '<br>' + "\n";
		html += '<br>' + "\n";
		html += 'URL: <b><a href="' + url + '">' + url + '</a></b>' + "\n";

		var message = {
			html:		html,
			subject:	appConfig.mandrill.subjectPrefix + ' ' + config.name,
			from_email:	appConfig.mandrill.fromEmail,
			from_name:	appConfig.mandrill.fromName,
			to: [{
				email:	email
			}],
			tags:		['page-monitor']
		};

		mandrillClient.messages.send({ message: message }, function( result ) {

			console.log( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] Mandrill success: ' + config.name + ' - ' + email );

		}, function( err ) {

			console.error('Mandrill error: ' + err.name + ' - ' + err.message);
			rollback( config, email, newItems, updatedItems );
		});

	} catch ( err ) {

		console.error( err );
		rollback( config, email, newItems, updatedItems );
	}
};



var parse = function ( config, url, email ) {

	console.log( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + config.name + ' - ' + email );

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

	console.log(
		'[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' +
		'found: ' + items.length + ', ' +
		'new: ' + newItems.length + ', ' +
		'updated: ' + updatedItems.length
	);

	sendMail( config, url, email, newItems, updatedItems );
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



var pushToQueue = function ( data ) {

	queue.push( data );

	if ( queue.length === 1 )
		processNext();
};



module.exports = {

	index: function ( data ) {

		if ( !data.enabled )
			return;

		pushToQueue( data );
		setInterval( pushToQueue, data.interval * 60 * 1000, data );
	}
};
