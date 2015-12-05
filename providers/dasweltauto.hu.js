module.exports = {
	name:		'dasweltauto.hu',
	selector:	'div.divErgebnisListe > div.carItem',
	attributes: {
		link: {
			selector:	'',
			value:		function ( elem ) {

				return 'http://www.dasweltauto.hu/d/detail?carId=' + elem.attr('data-car-id');
			}
		},
		name: {
			selector:	'> div.carData > div.carTileTitle > a.carTitle',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		image: {
			selector:	'> div.carData > div.carTile > div.carTileImage > img',
			value:		function ( elem ) {

				return 'http:' + elem.attr('src');
			}
		},
		price: {
			selector:	'> div.carData > div.carTilePrice > span.carPriceDiscount',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		year: {
			selector:	'> div.carData > div.carTileRegYear > span',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		engine: {
			selector:	'> div.carData > div.carTilePower',
			value:		function ( elem ) {

				return elem.text().replace(/\s+/g, ' ').trim();
			}
		},
		mileage: {
			selector:	'> div.carData > div.carTileKM > span',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		}
	}
};
