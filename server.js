// server.js

// modules =================================================
var express 		= require('express');
var app     		= express();
var mongoose		= require('mongoose');
var morgan 			= require('morgan');
var passport 		= require('passport');
var session 		= require('express-session')
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var flash			= require('connect-flash')
var cookieParser 	= require('cookie-parser')

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.local); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(cookieParser()); 					
app.use(methodOverride()); 					// simulate DELETE and PUT

// required for passport
// app.use(session({ secret: 'iloverykketinvite' })); // session secret
// app.use(flash());
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// routes ==================================================

require('./app/routes/')(app,express)
// require('./app/userRoutes')(app, express, passport); // configure our userroutes
// require('./app/signInRoutes')(app, express, passport); // signinroutes
// require('./app/adminRoutes')(app, express, passport);


// Catchall route
app.get('*', function(req, res){
    	res.sendfile(__dirname + '/public/index.html');
});
	



// Pick up any unrouted requests on the backend, and send it back to the indexfile


// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app