module.exports = {
	name:		'alberlet.hu',
	selector:	'div#listing-index > div.boxes-grid > div.box-grid',
	attributes: {
		id: {
			selector:	null,
			value:		function ( elem ) {

				return parseInt( elem.attr('data-listing-id') );
			}
		},
		link: {
			selector:	'> div.box-grid-head > h3 > a',
			value:		function ( elem ) {

				return elem.attr('href');
			}
		},
		name: {
			selector:	'> div.box-grid-head > h3 > a',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		image: {
			selector:	'> div.listing-image > a > img',
			value:		function ( elem ) {

				return elem.attr('src');
			}
		},
		price: {
			selector:	'> p.listing-rent',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		location: {
			selector:	'> div.box-grid-head > h4.city-with-info',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		size: {
			selector:	'> p.listing-rooms',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value	= ( typeof info[0] === 'string' ) ? info[0].trim() : '';

				return value.length ? value : null;
			}
		},
		rooms: {
			selector:	'> p.listing-rooms',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value	= ( typeof info[1] === 'string' ) ? info[1].trim() : '';

				return value.length ? value : null;
			}
		}
	}
};
