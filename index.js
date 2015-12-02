var parser	= require('./parser');



var alberlet_hu = function() {

	parser.parse('http://www.alberlet.hu/kiado_alberlet/berendezes:2/berleti-dij:0-136-ezer-ft/felszoba:nem/ingatlan-tipus:lakas/ingatlan:tegla/keppel:igen/kerulet:i+ii+iii+v+vi+vii+viii+ix+x+xi+xiii+xiv/megye:budapest/meret:60-x-m2/szoba:3-x/keres:advanced/limit:32/sort:reactivated/direction:desc', {
		name:				'alberlet.hu',
		selector:			'.boxes-grid .listing-item',
		attribute:			'id',
		open_url:			'http://www.alberlet.hu/kiado_alberlet/yolo_'
	});
};



var ingatlan_com = function() {

	parser.parse('http://ingatlan.com/szukites/t:Budapest+kiado+lakas+tegla-epitesu-lakas+uj-epitesu+ujszeru+felujitott+butorozott+csak-kepes+havi-136-ezer-Ft-ig+60-m2-felett+3-szoba-felett+i-ii-iii-ix-v-vi-vii-viii-x-xi-xiii-xiv-ker', {
		name:				'ingatlan.com',
		selector:			'.search-results tbody tr',
		attribute:			'data-id',
		open_url:			'http://ingatlan.com/'
	});
};



var hasznaltauto_hu = function() {

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page1', {
		name:				'hasznaltauto.hu',
		selector:			'.talalati_lista .talalati_lista_parkolo_cont [id$="_on"]',
		attribute:			'id',
		attribute_modify:	function(attribute) {

			return attribute.split('_')[1];
		},
		open_url:			'http://www.hasznaltauto.hu/auto/yolo-',
		callback:			hasznaltauto_hu2
	});
};

var hasznaltauto_hu2 = function() {

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page2', {
		name:				'hasznaltauto.hu',
		selector:			'.talalati_lista .talalati_lista_parkolo_cont [id$="_on"]',
		attribute:			'id',
		attribute_modify:	function(attribute) {

			return attribute.split('_')[1];
		},
		open_url:			'http://www.hasznaltauto.hu/auto/yolo-',
		callback:			hasznaltauto_hu3
	});
};

var hasznaltauto_hu3 = function() {

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page3', {
		name:				'hasznaltauto.hu',
		selector:			'.talalati_lista .talalati_lista_parkolo_cont [id$="_on"]',
		attribute:			'id',
		attribute_modify:	function(attribute) {

			return attribute.split('_')[1];
		},
		open_url:			'http://www.hasznaltauto.hu/auto/yolo-',
		callback:			hasznaltauto_hu4
	});
};

var hasznaltauto_hu4 = function() {

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page4', {
		name:				'hasznaltauto.hu',
		selector:			'.talalati_lista .talalati_lista_parkolo_cont [id$="_on"]',
		attribute:			'id',
		attribute_modify:	function(attribute) {

			return attribute.split('_')[1];
		},
		open_url:			'http://www.hasznaltauto.hu/auto/yolo-',
		//callback:			hasznaltauto_hu5
	});
};



var jofogas_hu = function() {

	parser.parse('http://www.jofogas.hu/magyarorszag/auto?q=golf%20v', {
		name:				'jofogas.hu',
		selector:			'.ad-list .ad-list-item',
		attribute:			'data-list-id',
		open_url:			'http://www.jofogas.hu/magyarorszag/yolo_',
		open_url_postfix:	'.htm',
		callback:			jofogas_hu2
	});
};

var jofogas_hu2 = function() {

	parser.parse('http://www.jofogas.hu/magyarorszag/auto?q=golf%205', {
		name:				'jofogas.hu',
		selector:			'.ad-list .ad-list-item',
		attribute:			'data-list-id',
		open_url:			'http://www.jofogas.hu/magyarorszag/yolo_',
		open_url_postfix:	'.htm'
	});
};



var weltauto_hu = function() {

	parser.parse('http://www.dasweltauto.hu/d/frgSearch?brand=Vlc*&garantie=false&maxPrice=2000000&minPS=100&minRegYear=2004&page=1&pageCount=1&privat=false', {
		name:				'weltauto.hu',
		selector:			'.divErgebnisListe .carItem.imbestand',
		attribute:			'data-car-id',
		open_url:			'http://www.dasweltauto.hu/d/detail?carId='
	});
};



var aaaauto_hu = function() {

	parser.parse('http://www.aaaauto.hu/vw/?carlist=1&make=131&ymin=2004&pmin=1500000&pmax=2200000&kmmax=175000&sort[]=8&sort[]=1&srclp=1&srcvans=0&tab3cols=4', {
		name:				'aaaauto.hu',
		selector:			'#result_table > .tr > .td.des > h2 > a',
		attribute:			'href',
		attribute_modify:	function(attribute) {

			var matches = attribute.match(/car\.html\?id=(\d+?)\#/);

			return matches[1];
		},
		open_url:			'http://www.aaaauto.hu/hu/vw-polo/car.html?id='
	});
};



//alberlet_hu();
//setInterval(alberlet_hu, 1000 * 60 * 5);

//ingatlan_com();
//setInterval(ingatlan_com, 1000 * 60 * 5);

jofogas_hu();
setInterval(jofogas_hu, 1000 * 60 * 15);

weltauto_hu();
setInterval(weltauto_hu, 1000 * 60 * 15);

aaaauto_hu();
setInterval(aaaauto_hu, 1000 * 60 * 15);

hasznaltauto_hu();
setInterval(hasznaltauto_hu, 1000 * 60 * 15);
