module.exports = {
	name:		'ingatlan.com',
	type:		'html',
	selector:	'div#search-results-main > table.search-results > tbody > tr.list-row',
	attributes: {
		id: {
			selector:	null,
			value:		function ( elem ) {

				return parseInt( elem.attr('id').replace(/[^\d]/g, '') );
			}
		},
		link: {
			selector:	'> td.address > a',
			value:		function ( elem ) {

				return 'http://ingatlan.com' + elem.attr('href');
			}
		},
		name: {
			selector:	'> td.address > a > span.address-highlighted',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		image: {
			selector:	'> td.thumbnail > div.thumbholder > div.thumbcontainer > a > img.ad-thumb',
			value:		function ( elem ) {

				return elem.attr('src');
			}
		},
		price: {
			selector:	'> td.centered > a > span.price-huf',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		location: {
			selector:	'> td.address > a > span.zone-address',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		size: {
			selector:	'> td.centered > a > span.numbers-highlight',
			value:		function ( elem ) {

				return elem.parent().first().text();
			}
		},
		rooms: {
			selector:	'> td.roomcount > a > span.numbers-highlight',
			value:		function ( elem ) {

				return elem.text();
			}
		}
	}
};
