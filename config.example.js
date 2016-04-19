module.exports = {
	adminEmail:			'your@email.com',
	mailService: 			'mandrill',	
	mandrill: {
		apiKey:			'YOUR_API_KEY',
		fromEmail:		'sender@email.com',
		fromName:		'PageMonitor',
		subjectPrefix:	'[BREAKING]'
	},
	mailgun: {
		apiKey: 			'YOUR_API_KEY',
		domain: 			'yourdomain.com',
		fromEmail:		'sender@email.com',
		fromName:		'PageMonitor',
		subjectPrefix:	'[BREAKING]'
	}	
};
