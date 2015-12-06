module.exports = {
	name:		'hasznaltauto.hu',
	selector:	'div.talalati_lista',
	attributes: {
		id: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_headcont > div.talalati_lista_head > h2 > a',
			value:		function ( elem ) {

				var matches = elem.attr('href').match(/-(\d+)$/);

				return parseInt( matches[1] );
			}
		},
		link: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_headcont > div.talalati_lista_head > h2 > a',
			value:		function ( elem ) {

				return elem.attr('href');
			}
		},
		name: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_headcont > div.talalati_lista_head > h2 > a',
			value:		function ( elem ) {

				return elem.text();
			}
		},
		description: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_tartalom > div.talalati_lista_szoveg > p.leiras-nyomtatas',
			value:		function ( elem ) {

				return elem.clone().children().remove().end().text().trim();
			}
		},
		image: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_tartalom > div.talalati_lista_kep > a > img',
			value:		function ( elem, scripts ) {

				var id		= elem.attr('id');
				var regex	= new RegExp('lazy_images.' + id + ' = \'(.+?)\';');
				var matches	= scripts.text().match( regex );

				return ( typeof matches[1] === 'string' ) ? matches[1] : null;
			}
		},
		price: {
			selector:	'> div.talalati_lista_jobb > div.talalati_lista_vetelar > div.arsor',
			value:		function ( elem ) {

				return elem.text().trim();
			}
		},
		year: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_infosor',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value	= ( typeof info[1] === 'string' ) ? info[1].trim() : '';

				return value.length ? value : null;
			}
		},
		fuel: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_infosor',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value	= ( typeof info[2] === 'string' ) ? info[2].trim() : '';

				return value.length ? value : null;
			}
		},
		engine: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_infosor',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value1	= ( typeof info[3] === 'string' ) ? info[3].trim() : '';
				var value2	= ( typeof info[4] === 'string' ) ? info[4].trim() : '';

				return ( value1.length || value2.length ) ? ( value1 + ( value1.length ? ' - ' : '' ) + value2 ) : null;
			}
		},
		mileage: {
			selector:	'> div.talalati_lista_bal > div.talalati_lista_infosor',
			value:		function ( elem ) {

				var info	= elem.text().split('·');
				var value	= ( typeof info[5] === 'string' ) ? info[5].trim() : '';

				return value.length ? value : null;
			}
		}
	}
};
