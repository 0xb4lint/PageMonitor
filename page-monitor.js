var monitor					= require('./monitor/monitor');

var aaaautoHu				= require('./monitor/providers/aaaauto.hu');
var alberletHu				= require('./monitor/providers/alberlet.hu');
var dasweltautoHu			= require('./monitor/providers/dasweltauto.hu');
var hasznaltautoHu			= require('./monitor/providers/hasznaltauto.hu');
var ingatlanCom				= require('./monitor/providers/ingatlan.com');
var jofogasHu				= require('./monitor/providers/jofogas.hu');
var ingatlanJofogasHu		= require('./monitor/providers/ingatlan.jofogas.hu');
var szkeneHu				= require('./monitor/providers/szkene.hu');



monitor.index({
	enabled:	false,
	config:		alberletHu,
	url:		'http://www.alberlet.hu/kiado_alberlet/berendezes:2/berleti-dij:0-136-ezer-ft/felszoba:nem/ingatlan-tipus:lakas/ingatlan:tegla/keppel:igen/kerulet:i+ii+iii+v+vi+vii+viii+ix+x+xi+xiii+xiv/megye:budapest/meret:60-x-m2/szoba:3-x/keres:advanced/limit:32/sort:reactivated/direction:desc',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		ingatlanCom,
	url:		'http://ingatlan.com/szukites/t:Budapest+kiado+lakas+tegla-epitesu-lakas+uj-epitesu+ujszeru+felujitott+butorozott+csak-kepes+havi-136-ezer-Ft-ig+60-m2-felett+3-szoba-felett+i-ii-iii-ix-v-vi-vii-viii-x-xi-xiii-xiv-ker',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		hasznaltautoHu,
	url:		'http://www.hasznaltauto.h/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page1',
	email:		'valentinxxx@gmail.com,valentin.xxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		hasznaltautoHu,
	url:		'http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page2',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		hasznaltautoHu,
	url:		'http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page3',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		hasznaltautoHu,
	url:		'http://www.hasznaltauto.hu/talalatilista/auto/T4R1MS7LU76AO22Z6TTHGOO8LHGH2OUPF9YZC7FA93QS3UDJLY4PSQZTA52W7T8JRJJU14QYWUERML9E074SH6OQLO0U0DR024C65RLODL8EFPF573LK5E9W195A34YFM4CWR05MY94FP580G1EOR5P7P8E801AHFR96GWK4ZD6CKYMWLLP5HJPJQJFY37UTDTJFQ12UKPFCZWDR355HA8CHRPQPO1A1J56KR5JW1JHKP2LPGRW0KIKMSSE5KJE643Y20T8K6R0Q0JKCWTE7RPMZJAG7TJ5UFH65CISGMFUO8DIQ15Q68I08D0D502JES9OG0QTEPETIMRCL95ZG5DC8AFM17HZ3YEP5MG4YU1YOLKTGMQD8EK3S5LQYUPKPT9AWAU1UJJKJESEOI5ACZ7TTFWS35HQ7T7YLWR5MIKK5TM6FLCTYG4R459O/page4',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		jofogasHu,
	url:		'http://www.jofogas.hu/magyarorszag/auto?q=golf%20v',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		jofogasHu,
	url:		'http://www.jofogas.hu/magyarorszag/auto?q=golf%205',
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		dasweltautoHu,
	url:		'http://www.dasweltauto.hu/d/frgSearch?brand=Vlc*&garantie=false&maxPrice=2200000&minPS=100&minRegYear=2004&page=1&pageCount=1&privat=false', // AJAX url
	email:		'valentinxxx@gmail.com',
	interval:	10
});

monitor.index({
	enabled:	true,
	config:		aaaautoHu,
	url:		'http://www.aaaauto.hu/vw/?carlist=1&make=131&ymin=2004&pmin=1500000&pmax=2200000&kmmax=175000&sort[]=8&sort[]=1&srclp=1&srcvans=0&tab3cols=4', // AJAX url
	email:		'valentinxxx@gmail.com',
	interval:	10
});
