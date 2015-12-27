var low		= require('lowdb');
var moment	= require('moment');
var db		= low(__dirname + '/../db.json');



module.exports = {
	getDB: function( database ) {

		return db( database );
	},
	rollback: function ( config, email, newItems, updatedItems ) {

		try {

			// remove new items
			for ( var i in newItems )
				db( config.name + '-' + email ).remove({ id: newItems[ i ].id });

			// fake update updated items
			for ( var i in updatedItems )
				db( config.name + '-' + email ).find({ id: updatedItems[ i ].id }).link += Math.random();

		} catch ( err ) {

			console.error( '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + err.stack );
		}
	}
}
