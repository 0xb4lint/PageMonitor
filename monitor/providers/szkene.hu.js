module.exports = {
	name:		'szkene.hu',
	type:		'json',
	selector:	'div.infoContent',
	attributes: {
		id: {
			selector:	'url',
			value:		function ( elem ) {

				var matches = elem.match(/=(\d+)$/);

				return parseInt( matches[1] );
			}
		},
		link: {
			selector:	'url',
			value:		function ( elem ) {

				return 'http://szkene.hu' + elem;
			}
		},
		name: {
			selector:	'cim',
			value:		function ( elem ) {

				return elem;
			}
		},
		location: {
			selector:	'helyszin',
			value:		function ( elem ) {

				return elem;
			}
		},
		time: {
			selector:	'kezdes',
			value:		function ( elem ) {

				return elem;
			}
		},
		note: {
			selector:	'megjegyzes',
			value:		function ( elem ) {

				return elem;
			}
		}
	}
};
