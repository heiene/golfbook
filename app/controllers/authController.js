var passport = require('passport');


//Litt usikker på hvilken strategi som bør brukes. Funker veldig bra på 
//BAckend med postman  basic strategi, men for å få det til på
//frontend uten sånn popup login, så funker local bedre...


// Bare kommenter ut og skift strategi
// var Strategy = require('passport-http').BasicStrategy;
var Strategy   = require('passport-local').Strategy;
var User = require('../models/user');

var ses = { session : false };

passport.use('basic-signin', new Strategy(
  function(username, password, callback) {
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

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.use('basic-signup', new Strategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
      	return callback(err); 
      }

      // User already exists
      if (user) { 
      	return callback(null, false); 
      } else {

      		var newUser	= new User();
            // set the user's basic credentials
            newUser.username    = username;
            newUser.password 	= newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return callback(null, newUser);
            });

      }

      // Make sure the password is correct
      
    });
  }
));

exports.userSignup		= passport.authenticate('basic-signup', ses);
exports.isAuthenticated = passport.authenticate('basic-signin', ses);