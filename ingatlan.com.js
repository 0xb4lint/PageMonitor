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

var json_file = '/Users/valentinx/scripts/ingatlan.com.json';
var old_alberletek = require(json_file);

//var url = 'http://ingatlan.com/szukites/t:Budapest+kiado+lakas+tegla-epitesu-lakas+uj-epitesu+ujszeru+felujitott+butorozott+csak-kepes+havi-120-ezer-Ft-ig+60-m2-felett+3-szoba-felett+i-ii-ix-v-vi-vii-viii-xi-xiii-xiv-ker';
var url = 'http://ingatlan.com/szukites/t:Budapest+kiado+lakas+tegla-epitesu-lakas+uj-epitesu+ujszeru+felujitott+butorozott+csak-kepes+havi-136-ezer-Ft-ig+60-m2-felett+3-szoba-felett+i-ii-iii-ix-v-vi-vii-viii-x-xi-xiii-xiv-ker';

exec('osascript -e \'display notification "albérletek keresése" with title "ingatlan.com"\'');

request({
   uri: url,
}, function(error, response, body) {
   var $ = cheerio.load(body);

   var alberletek = [];

   $('.search-results tbody tr').each(function() {

      if ( !$(this).attr('id') )
         return;

      alberletek.push( $(this).attr('id') );
   });

   alberletek.sort();

   fs.writeFile(json_file, JSON.stringify( alberletek ));

   var uj = diff( alberletek, old_alberletek );

   if ( uj.length )
      exec('osascript -e \'display notification "' + uj.length + ' új albérlet" with title "ingatlan.com"\'');
   else
      exec('osascript -e \'display notification ":(" with title "ingatlan.com"\'');

   for ( var i = 0; i < uj.length; i++ ) {

      var temp = uj[i].split('-');
      var id   = temp[1];

      open('http://ingatlan.com/' + id);
   }
});
