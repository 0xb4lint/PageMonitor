module.exports = {
	name:		'ingatlan.jofogas.hu',
	type:		'html',
	selector:	'.search-list-container > .list-items > .list-item > div',
	attributes: {
		id: {
			selector:	null,
			value:		function( elem ) {

				return parseInt( elem.attr('id') );
			}
		},
		link: {
			selector:	'a.subject',
			value:		function ( elem ) {

				return elem.attr('href').replace(/\?.+$/, '');
			}
		},
		name: {
			selector:	'a.subject',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		image: {
			selector:	'img.image',
			value:		function ( elem ) {

				var backgroundImage = elem.css('background-image');

				return backgroundImage ? backgroundImage.replace(/url\('(.+)'\)/, '$1') : null;
			}
		},
		price: {
			selector:	'.price',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		location: {
			selector:	'.cityname',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		size: {
			selector:	'.size',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		rooms: {
			selector:	'.rooms',
			value:		function ( elem ) {

				return elem.text();
			}
		}
	},
	options: {
		encoding: 'binary'
	}
};
