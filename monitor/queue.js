var queue = [];



module.exports = {
	next: function() {

		return queue.shift();
	},
	push: function( data ) {

		return queue.push( data );
	},
	shift: function() {

		return queue.shift();
	},
	getLength: function() {

		return queue.length;
	}
}
