module.exports = {
	name:		'hasznaltauto.hu',
	type:		'html',
	selector:	'div.talalati-sor',
	attributes: {
		id: {
			selector:	'div.cim-kontener > h3 > a',
			value:		function ( elem ) {

				var matches = elem.attr('href').match(/-(\d+)$/);

				return parseInt( matches[1] );
			}
		},
		link: {
			selector:	'div.cim-kontener > h3 > a',
			value:		function ( elem ) {

				return elem.attr('href');
			}
		},
		name: {
			selector:	'div.cim-kontener > h3 > a',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		description: {
			selector:	'div.talalatisor-infodoboz div[data-hj-suppress]',
			value:		function ( elem ) {

				return elem.clone().children().remove().end()[0].children[0].data.trim()
			}
		},
		image: {
			selector:	'div.talalatisor-kep img',
			value:		function ( elem, $ ) {

				return elem.attr('data-lazyurl').split('t.').join('.')
			}
		},
		price: {
			selector:	'div.vetelar',
			value:		function ( elem ) {

				return elem.clone().children().remove().end()[0].children[0].data.trim();
			}
		},
		year: {
			selector:	'div.talalatisor-info.adatok',
			value:		function ( elem ) {

				var info	= elem.text().split(',');
				var value	= ( typeof info[1] === 'string' ) ? info[1].trim() : '';

				return value.length ? value : null;
			}
		},
		fuel: {
			selector:	'div.talalatisor-info.adatok',
			value:		function ( elem ) {

				var info	= elem.text().split(',');
				var value	= ( typeof info[0] === 'string' ) ? info[0].trim() : '';

				return value.length ? value : null;
			}
		},
		engine: {
			selector:	'div.talalatisor-info.adatok',
			value:		function ( elem ) {

				var info	= elem.text().split(',');
				var value0	= ( typeof info[2] === 'string' ) ? info[2].trim() : '';
				var value1	= ( typeof info[3] === 'string' ) ? info[3].trim() : '';
				var value2	= ( typeof info[4] === 'string' ) ? info[4].trim() : '';

				var retVal = value0 || ''
				retVal += value1.length ? (' - ' + value1) : ''
				retVal += value2.length ? (' - ' + value2) : ''
				return retVal
				// return ( value0.length || value1.length || value2.length ) ? ( value0 + value1 + ( value1.length ? ' - ' : '' ) + value2 ) : null;
			}
		},
		mileage: {
			selector:	'div.talalatisor-info.adatok',
			value:		function ( elem ) {

				var info	= elem.text().split(',');
				var value	= ( typeof info[5] === 'string' ) ? info[5].trim() : '';

				return value.length ? value : null;
			}
		}
	}
};
