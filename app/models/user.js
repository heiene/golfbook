var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
	userName: String/*,
	name: 
		{
		first: String,
		last: String 
		},
	email: String,
	isAdmin: Boolean*/

});

module.exports = mongoose.model('User', userSchema);
