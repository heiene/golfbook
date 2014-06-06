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
		.post(passport.authenticate('local-signup', 
				{successRedirect: '/api/signup/success',
            	failureRedirect: '/login',
                failureFlash: true })/*, 
				function (req, res) {
					res.json({message: 'signup successfull', user: req.user})*/
		);

	router.route('/api/signup/success')
		.get(function (req, res, user){
        	res.json({
            	success: true,
            	mesag: ''
        	});
    });
				

	router.route('/login')
		.post(passport.authenticate('local-login', 
				{successRedirect : '/fittanda', // redirect to the secure profile section
				failureRedirect : '/faen', // redirect back to the signup page if there is an error
				}) // allow flash messages with failureflash
			
		);
			
		

	app.use(router);

}

var auth = function(req, res, next) { 
	if (!req.isAuthenticated()) 
		res.send(401); 
	else next(); 
};

