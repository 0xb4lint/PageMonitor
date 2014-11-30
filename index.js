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

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/2G4ZLM3QHYHGDGFCJKPAS2Q1GF988GTHYEZ9GD9U7UM8GA023UAHHC4KE1AL3YL205F8W1GMMMDIFKC04OEWMFU7DWL68HHPDF1U3FQLOPW6USTQH1H66FOGMT3I0TYCCU816LRAT9A0O3547AAS76WEQI0T4CWMFG84YM59841O8HP5LF6I8G1EIOW63WL5YGUQH81PYWL78HGUQ2WJWUZC788TYUIJP3GSUYKPWLCL3CTIOTGSO5ZA64MWLCGP8J6E8450R178ZCKU9SUOZL0HQJ31KAI3LJZ5YA0CGA1GCW603I1EJR2AD68TZSJQD/page1', {
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

	parser.parse('http://www.hasznaltauto.hu/talalatilista/auto/2G4ZLM3QHYHGDGFCJKPAS2Q1GF988GTHYEZ9GD9U7UM8GA023UAHHC4KE1AL3YL205F8W1GMMMDIFKC04OEWMFU7DWL68HHPDF1U3FQLOPW6USTQH1H66FOGMT3I0TYCCU816LRAT9A0O3547AAS76WEQI0T4CWMFG84YM59841O8HP5LF6I8G1EIOW63WL5YGUQH81PYWL78HGUQ2WJWUZC788TYUIJP3GSUYKPWLCL3CTIOTGSO5ZA64MWLCGP8J6E8450R178ZCKU9SUOZL0HQJ31KAI3LJZ5YA0CGA1GCW603I1EJR2AD68TZSJQD/page2', {
		name:				'hasznaltauto.hu',
		selector:			'.talalati_lista .talalati_lista_parkolo_cont [id$="_on"]',
		attribute:			'id',
		attribute_modify:	function(attribute) {

			return attribute.split('_')[1];
		},
		open_url:			'http://www.hasznaltauto.hu/auto/yolo-'
	});
};



//alberlet_hu();
//setInterval(alberlet_hu, 1000 * 60 * 5);

//ingatlan_com();
//setInterval(ingatlan_com, 1000 * 60 * 5);

hasznaltauto_hu();
setInterval(hasznaltauto_hu, 1000 * 60 * 60);
