var User = require('../models/user');

//Middleware for router

module.exports = function(app, express, passport) {

	var router = express.Router();
	
	// Adding some middleware- Testing that middleware works
	router.use('/signup', function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'Signup route is entered!!');

		// continue doing what we were doing and go to the route
		next();	
	});	

	router.use('/login', function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'login route is entered!!');

		// continue doing what we were doing and go to the route
		next();	
	});



	router.route('/signup')
		// process the signup form
		.post(passport.authenticate('local-signup'/*, {failureRedirect: '/FAILyooo', failureFlash: true}*/), function (req, res) {
					console.log("Signup yooooqw")
					res.json({message: 'signup successfull', user: req.user})
					}
		);
				

	router.route('/login')

		.post(passport.authenticate('local-login'/*, {failureRedirect: '/FAILTOLOGIN'}*/), function (req, res) {
					console.log("Login yooow")
					res.json({message: 'signin successfull', user: req.user})
					} 
		);

	app.get('/logout', function(req, res, next) {
		console.log('Logging out, session is: ',req.session)
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});

	app.get('/profile', auth, function(req, res, next) {
		res.redirect('/profile')
		console.log('Logga inn')
	});

	// Make app use the router
	app.use(router);

}

var auth = function(req, res, next) { 
	if (!req.isAuthenticated()) {
		res.send(401); 
	} else {
		console.log('auth ok')
		next();
		} 
};
