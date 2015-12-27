var moment		= require('moment');
var mandrill	= require('mandrill-api/mandrill');
var appConfig	= require(__dirname + '/../config');



var createHtmlListFromItems = function ( items ) {

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



module.exports = {
	sendMail: function ( config, url, email, newItems, updatedItems, customHTML ) {

		if ( !email || ( !newItems.length && !updatedItems.length && !customHTML ) )
			return;

		try {

			var html			= '';
			var mandrillClient	= new mandrill.Mandrill( appConfig.mandrill.apiKey );

			if ( newItems.length ) {

				html += '<h1>NEW</h1>' + "\n";
				html += createHtmlListFromItems( newItems );
			}

			if ( newItems.length && updatedItems.length ) {

				html += '<br>' + "\n";
				html += '<br>' + "\n";
			}

			if ( updatedItems.length ) {

				html += '<h1>UPDATED</h1>' + "\n";
				html += createHtmlListFromItems( updatedItems );
			}

			if ( customHTML )
				html += customHTML;

			html += '<br>' + "\n";
			html += '<br>' + "\n";
			html += 'URL: <b><a href="' + url + '">' + url + '</a></b>' + "\n";

			var to = [];
			var emails = email.split(/[,;]/);

			for ( var i in emails )
				to.push({ email: emails[ i ]});

			var message = {
				html:		html,
				subject:	appConfig.mandrill.subjectPrefix + ' ' + config.name,
				from_email:	appConfig.mandrill.fromEmail,
				from_name:	appConfig.mandrill.fromName,
				to:			to,
				tags:		['page-monitor']
			};

			mandrillClient.messages.send({ message: message }, function( result ) {

				console.log( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] Mandrill success: ' + config.name + ' - ' + email );

			}, function( err ) {

				console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] Mandrill error: ' + err.name + ' - ' + err.message );
				db.rollback( config, email, newItems, updatedItems );
			});

		} catch ( err ) {

			console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + err.stack );
			db.rollback( config, email, newItems, updatedItems );
		}
	}
};
