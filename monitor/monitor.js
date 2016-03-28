var moment		= require('moment');

var appConfig	= require(__dirname + '/../config');

var mail		= require(__dirname + '/mail');
var queue		= require(__dirname + '/queue');
var inspector	= require(__dirname + '/inspector');



var processNext = function() {

	var next = queue.next();

	if ( !next )
		return;

	try {

		var url = next.url;

		url = url.replace(/\{YYYY\+(\d+)\}/, function( match, $1 ) {

			return moment().add($1, 'years').format('YYYY');
		});

		url = url.replace(/\{MM\+(\d+)\}/, function( match, $1 ) {

			return moment().add($1, 'months').format('MM');
		});

		url = url.replace(/\{DD\+(\d+)\}/, function( match, $1 ) {

			return moment().add($1, 'days').format('DD');
		});

		url = url.replace('{YYYY}', moment().format('YYYY'));
		url = url.replace('{MM}', moment().format('MM'));
		url = url.replace('{DD}', moment().format('DD'));

		inspector.inspect( next.config, url, next.email );

	} catch ( err ) {

		console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + err.stack );

		mail.sendMail( next.config, next.url, appConfig.adminEmail, [], [], '<pre>' + err.stack + '</pre>' );

	} finally {

		queue.shift();
		processNext();
	}
};



var pushToQueue = function ( data ) {

	queue.push( data );

	if ( queue.getLength() === 1 )
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
