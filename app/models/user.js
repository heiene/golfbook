var mongoose    = require('mongoose');
var bcrypt   	= require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var userSchema  = new Schema({
	userName: 	String,
	password: 	String,
	isAdmin: 	Boolean,
	isLoggedin: Boolean,
	name: 
		{
		first: String,
		last: String 
		},
	email: String,
	hcp: Number


});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
