var passport = require('passport');


//Litt usikker på hvilken strategi som bør brukes. Funker veldig bra på 
//BAckend med postman  basic strategi, men for å få det til på
//frontend uten sånn popup login, så funker local bedre...


// Bare kommenter ut og skift strategi
var Strategy = require('passport-http').BasicStrategy;
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

var localOptions = {
            session : false
            };

var basicOptions = {
    session : false,
    passReqToCallback : true

};

// Om vi skal ha session paa server saa maa vi bruke disse:
/*passport.serializeUser(function(user, done) {
    done(null, user.id);
});
*/
// used to deserialize the user
/*passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
*/




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

          // Success
          return callback(null, user);
        });
      });
    // }); //Uncomment denne om vi vil ha det asyncronious  
  }
));

passport.use('local-login', new LocalStrategy(
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
      })
  }
));

exports.userLogin   	= passport.authenticate('local-login', localOptions);
exports.isAuthenticated = passport.authenticate('basic-auth', basicOptions);