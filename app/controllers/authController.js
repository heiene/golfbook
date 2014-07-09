var passport = require('passport');

// Basci Strategy
var Strategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

var basicOptions = {
    session : false,
//    passReqToCallback : true,
    disableBasicChallenge: true
};

passport.use('basic-auth', new Strategy(
  function(username, password, callback) {

    // Uncomment den process.nextTick om vi vil ha async opplegg
    // User.findOne wont fire unless data is sent back
    // process.nextTick(function() {    

      User.findOne({ username: username }, function (err, user) {
        if (err) { 
        	return callback(err); 
        }

        // No user found with that username
        if (!user) { 
        	return callback(null, false); 
        }

        // Make sure the password is correct
        user.verifyPassword(password, function(err, isMatch) {
            if (err) {
          	  return callback(err);
            }

          // Password did not match

            if (!isMatch) {
                return callback(null, false);
            }

          // Success - Fjerner passord fra returnert bruker;
            user.password = '';
            return callback(null, user);
        });
      });
    // }); //Uncomment denne om vi vil ha det asyncronious
  }
));

exports.isAuthenticated = passport.authenticate('basic-auth', basicOptions);