var mongoose    = require('mongoose');
var bcrypt   	= require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var userSchema  = new Schema({
	username: 	String,
	password: 	String,
	isAdmin: 	Boolean,
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

//Bruker denne isteden for validPassword over
userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
