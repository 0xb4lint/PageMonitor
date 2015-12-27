var request	= require('sync-request');
var cheerio	= require('cheerio');



var getUrl = function( url ) {

	return request('GET', url, { timeout: 15 * 1000 });
};



var loadJquery = function( response, config ) {

	return cheerio.load( response.getBody( config.options && config.options.encoding ? config.options.encoding : 'utf-8' ) );
};



module.exports = {
	parse: function( config, url ) {

		return loadJquery( getUrl( url ), config );
	}
}
