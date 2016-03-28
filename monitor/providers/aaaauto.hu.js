module.exports = {
	name:		'aaaauto.hu',
	type:		'html',
	selector:	'div#result_table > div.tr',
	attributes: {
		id: {
			selector:	'> div.td > h2 > a',
			value:		function ( elem ) {

				var matches = elem.attr('href').match(/\?id=(\d+)/);

				return parseInt( matches[1] );
			}
		},
		link: {
			selector:	'> div.td > h2 > a',
			value:		function ( elem ) {

				return elem.attr('href');
			}
		},
		name: {
			selector:	'> div.td > h2 > a',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		image: {
			selector:	'> div.td.car_image > a > img',
			value:		function ( elem ) {

				return elem.attr('src');
			}
		},
		description: {
			selector:	'> div.td > div.car_short_description',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text();
			}
		},
		price: {
			selector:	'> div.td > p.car_price > a > strong',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		year: {
			selector:	'> div.td > div.car_short_description > ul > li:nth-child(1)',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text().trim();
			}
		},
		engine: {
			selector:	'> div.td > div.car_short_description > ul > li:nth-child(3)',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text().replace(/\s+/g, ' ').trim();
			}
		},
		mileage: {
			selector:	'> div.td > div.car_short_description > ul > li:nth-child(2)',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text().trim();
			}
		},
		transmission: {
			selector:	'> div.td > div.car_short_description > ul > li:nth-child(4)',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text().trim();
			}
		}
	}
};
