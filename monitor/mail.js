var moment		= require('moment');
var appConfig	= require(__dirname + '/../config');

var getMailer = function ( config ) {
	var mailFunctions = {
		'mandrill': {
				sendMail : function ( message ) {
					var mandrill	= require('mandrill-api/mandrill');
					var mandrillClient	= new mandrill.Mandrill( appConfig.mandrill.apiKey );
					message.subject = (appConfig.mandrill.subjectPrefix ? appConfig.mandrill.subjectPrefix + ' ' : '') + config.name;
					message.from_email = appConfig.mandrill.fromEmail;
					message.from_name = appConfig.mandrill.fromName;
					message.tags = ['page-monitor'];
					return new Promise( function ( resolve, reject ) {
						mandrillClient.messages.send( { message: message }, function( result ) {
							resolve( result );
						}, function( err ) {
							reject( err );
						});
					});
				}
		},
		'mailgun': {
				sendMail : function ( message ) {
					var mailgun		= require('mailgun-js')( {apiKey: appConfig.mailgun.apiKey, domain: appConfig.mailgun.domain} );
					message.from = appConfig.mailgun.fromName + ' <' + appConfig.mailgun.fromEmail + '>';					
					message.subject = (appConfig.mailgun.subjectPrefix ? appConfig.mailgun.subjectPrefix + ' ' : '') + config.name;
					message['o:tag'] = 'page-monitor';
					toList = message.to;
					message.to = '';
					toList.forEach( function( element, index ){
						if( index )
							message.to += ',';
						message.to += element.email;
					});
					return new Promise( function ( resolve, reject ) {
						mailgun.messages().send(message, function ( err, result ) {
							if( err )
								reject( err );
							else
								resolve( result );
						});
					});
				}			
		}
	};
	return mailFunctions[appConfig.mailService];
};


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
				to.push({ email: emails[ i ].trim()});

			var message = {
				html:		html,
				to:			to
			};

			var mailer = getMailer( config );
			mailer.sendMail(message).then( function(result) {
				console.log( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] Mail success: ' + config.name + ' - ' + email );
			}).catch( function( err ) {
				console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] Mail error: ' + err.name + ' - ' + err.message );
				db.rollback( config, email, newItems, updatedItems );
			});

		} catch ( err ) {

			console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + err.stack );
			db.rollback( config, email, newItems, updatedItems );
		}
	}
};
