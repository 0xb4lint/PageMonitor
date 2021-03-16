var moment	= require('moment');
var db		= require(__dirname + '/db');
var mail	= require(__dirname + '/mail');
var parser	= require(__dirname + '/parser');



var getHtmlItems = function( config, url ) {

	var $ = parser.parse( config, url );

	// empty array
	var items = [];

	// loop through items
	$( config.selector ).each(function() {

		// get attributes
		var item = {};
		for ( var attribute in config.attributes ) {

			var attributeConfig		= config.attributes[ attribute ];
			var element				= attributeConfig.selector ? $(this).find( attributeConfig.selector ) : $(this);

			item[ attribute ]		= element.length ? attributeConfig.value( element, $ ) : null;
		}

		// use link as id
		if ( !item.id )
			item.id = item.link;

		// add to array
		items.push( item );
	});

	return items;
};



var getJsonItems = function( config, url ) {

	// empty array
	var items = [];

	// load and parse
	var content = JSON.parse( parser.load( url ).getBody() );

	if ( typeof content === 'object' ) {

		var tempContent = [];

		for ( var key in content ) {

			var row = content[ key ];

			if ( row instanceof Array ) {

				for ( var i in row ) {

					var row2 = row[ i ];
					row2.i = key;

					tempContent.push( row2 );
				}

			} else {

				row.i = key;
				tempContent.push( row );
			}
		}

		content = tempContent;
	}

	// loop through items
	for ( var i in content ) {

		// get attributes
		var item = {};
		for ( var attribute in config.attributes ) {

			var attributeConfig		= config.attributes[ attribute ];
			var element				= content[ i ][ attributeConfig.selector ];

			item[ attribute ]		= element && element.length ? attributeConfig.value( element, content[i] ) : null;
		}

		// use link as id
		if ( !item.id )
			item.id = item.link;

		// add to array
		items.push( item );
	}

	return items;
};



var getItems = function( config, url ) {

	if ( config.type === 'html' )
		return getHtmlItems( config, url );

	if ( config.type === 'json' )
		return getJsonItems( config, url );
};



module.exports = {
	inspect: function ( config, url, email, tag ) {

		console.log( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + config.name + (tag ? (' - ' + tag) : '')  + ' - ' + email );

		// check items in database
		var newItems		= [];
		var updatedItems	= [];

		try {

			var items = getItems( config, url );

			for ( var i in items ) {

				var item	= items[ i ];
				var found	= db.getDB( config.name + '-' + email ).find({ id: item.id });

				if ( !found ) {

					db.getDB( config.name + '-' + email ).push( item );
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

		} catch ( err ) {

			db.rollback( config, email, newItems, updatedItems );

			throw err;
		}

		mail.sendMail( config, url, email, tag, newItems, updatedItems );
	}
};
