module.exports = {
	transporter: {
		service:	'Gmail',
		auth: {
			user:	'gmail.user@gmail.com',
			pass:	'userpass'
		}
	},
	config: {
		from:		'gmail.user@gmail.com',
		subject:	'[BREAKING]'	// prefix - provider name will be appended
	}
};
