function diff(A, B) {
   return A.filter(function (a) {
      return B.indexOf(a) == -1;
   });
}

var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var sys     = require('sys');
var exec    = require('child_process').exec;
var open    = require('open');

var json_file = '/Users/valentinx/scripts/alberlet.hu.json';
var old_alberletek = require(json_file);

//var url = 'http://www.alberlet.hu/kiado_alberlet/berendezes:2/berleti-dij:0-120-ezer-ft/ingatlan-tipus:lakas/ingatlan:tegla/keppel:igen/kerulet:i+ii+v+vi+vii+viii+ix+xi+xiii+xiv/megye:budapest/meret:60-x-m2/szoba:3-x/keres:advanced/limit:32/sort:reactivated/direction:desc';
var url = 'http://www.alberlet.hu/kiado_alberlet/berendezes:2/berleti-dij:0-136-ezer-ft/felszoba:nem/ingatlan-tipus:lakas/ingatlan:tegla/keppel:igen/kerulet:i+ii+iii+v+vi+vii+viii+ix+x+xi+xiii+xiv/megye:budapest/meret:60-x-m2/szoba:3-x/keres:advanced/limit:32/sort:reactivated/direction:desc';

exec('osascript -e \'display notification "albérletek keresése..." with title "alberlet.hu"\'');

request({
   uri: url,
}, function(error, response, body) {
   var $ = cheerio.load(body);

   var alberletek = [];

   $('.boxes-grid .listing-item').each(function() {

      if ( !$(this).data('listing-id') )
         return;

      alberletek.push( $(this).data('listing-id') );
   });

   alberletek.sort();

   fs.writeFile(json_file, JSON.stringify( alberletek ));

   var uj = diff( alberletek, old_alberletek );

   if ( uj.length )
      exec('osascript -e \'display notification "' + uj.length + ' új albérlet" with title "alberlet.hu"\'');
   else
      exec('osascript -e \'display notification ":(" with title "alberlet.hu"\'');

   for ( var i = 0; i < uj.length; i++ ) {

      var id   = uj[i];

      open('http://www.alberlet.hu/kiado_alberlet/yolo_' + id);
   }
});
