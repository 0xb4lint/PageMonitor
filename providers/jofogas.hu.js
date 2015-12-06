module.exports = {
	name:		'jofogas.hu',
	selector:	'ol.ad-list > li.ad-list-item',
	attributes: {
		id: {
			selector:	null,
			value:		function( elem ) {

				return parseInt( elem.attr('data-list-id') );
			}
		},
		link: {
			selector:	'> a',
			value:		function ( elem ) {

				return elem.attr('href').replace(/\?.+$/, '');
			}
		},
		name: {
			selector:	'> a > div.middle-column > div.ad-subject',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		image: {
			selector:	'> a > div.left-column > div.image-container',
			value:		function ( elem ) {

				var backgroundImage = elem.css('background-image');

				return backgroundImage ? backgroundImage.replace(/url\('(.+)'\)/, '$1') : null;
			}
		},
		price: {
			selector:	'> a > div.middle-column > div.ad-price',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		location: {
			selector:	'> a > div.right-column > div.column-inner > div.listing-location > div.listing-city',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		}
	},
	options: {
		encoding: 'binary'
	}
};
