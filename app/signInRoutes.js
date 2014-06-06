var User = require('./models/user');

//Middleware for router

module.exports = function(app, express, passport) {

	var router = express.Router();
	
	router.use('/api/signup', function(req, res, next) {

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



	router.route('/api/signup')
		.get(function (req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				else {
					res.json(users);
				}
			});
		})
		// process the signup form
		.post(passport.authenticate('local-signup'/*, {failureRedirect: '/FAILyooo', failureFlash: true}*/), function (req, res) {
					console.log("ERRRRRRRRRRRRRRRRRRR")
					res.json({message: 'signup successfull', user: req.user})
					}/*, 
				function (req, res) {
					res.json({message: 'signup successfull', user: req.user})*/
		);

/*	router.route('/api/signup/success')
		.get(function (req, res, user){
        	res.json({
            	success: true,
            	mesag: ''
        	});*/
				

	router.route('/login')
		.get( function (req, res) {
			console.log('funker detta da?')
		})
		.post(passport.authenticate('local-login', {failureRedirect: '/FAILTOLOGIN'}), function (req, res) {
					console.log("LOggga inn")
					res.json({message: 'signin successfull', user: req.user})

					} 
			
		);

	app.get('/logout', function(req, res, next) {
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',req.session)
		req.logout();
		console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', req.user)
		res.send(req.user)
		res.redirect('/courses');
	});

	app.get('/profile', auth, function(req, res, next) {
		console.log('Logga inn')
	});


			
		

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
