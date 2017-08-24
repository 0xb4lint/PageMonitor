module.exports = {
	name:		'ingatlan.com',
	type:		'html',
	selector:	'main.resultspage__main > div.resultspage__listings > div.listing',
	attributes: {
		id: {
			selector:	null,
			value:		function ( elem ) {

				return parseInt( elem.attr('data-id') );
			}
		},
		link: {
			selector:	'> div.listing__card > a.listing__link',
			value:		function ( elem ) {

				return 'https://ingatlan.com' + elem.attr('href');
			}
		},
		name: {
			selector:	'> div.listing__card > a.listing__link header.listing__header > div.listing__featured-parameters > div.listing__address',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		image: {
			selector:	'> div.listing__card > a.listing__thumbnail > img.listing__image',
			value:		function ( elem ) {

				return elem.attr('src');
			}
		},
		price: {
			selector:	'> div.listing__card > a.listing__link > header.listing__header > div.listing__featured-parameters > div.listing__price > div.price',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		size: {
			selector:	'> div.listing__card > a.listing__link > div.listing__parameters div.listing__data--area-size',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		rooms: {
			selector:	'> div.listing__card > a.listing__link > div.listing__parameters div.listing__data--room-count',
			value:		function ( elem ) {

				return elem.text();
			}
		}
	}
};
