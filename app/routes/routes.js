var User 	= require('../models/user');
// var Course 	= require('./models/course');
// var Round	= require('./models/round');


module.exports = function(app, express, passport) {

	var router = express.Router();

	// Adding Middleware for admin router - all routes for admin, make sure that the user is admin by checkAdmin();
	router.use('/api/users/:user_id', checkAdmin, function (req, res, next) {
		console.log("Admin route is entered")
		next();
	});

	router.use('/login', function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'login route is entered!!');

		// continue doing what we were doing and go to the route
		next();	
	});

	router.use('/signup', function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'Signup route is entered!!');

		// continue doing what we were doing and go to the route
		next();	
	});

	// USER ROUTES ======================================

	// SIGNIN/ SIGNUP / LOGOUT ROUTES ======================
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

	router.route('/logout')
		.get(function(req, res, next) {
			console.log('Logging out, session is: ',req.session)
			req.logout();
			req.session.destroy();
			res.redirect('/');
	});

	// LIST USERS =======================================
	router.route('/api/users')

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

	// UPDATE USER BY ID - ADMIN ==============================
	router.route('/api/users/:user_id')
		.put(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					user.userName = req.body.userName;
					user.password = req.body.password;
					user.isAdmin = true;

					user.save(function (err) {
						if (err) {
							res.send(err);
						}
						else {
							res.json({ message: 'User updated!' , user: user});
						}
					})
				};

			})
		
		})

		// DELETE USER BY ID - ADMIN ==========================
		.delete( function (req, res) {
			User.remove( {
				_id: req.params.user_id
			}, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					console.log('usaaaa is deleta')
					res.json({ message: 'User deleted!', user: user });
				}
			})
			
		})

	// USER PROFILE ROUTE - USER MUST BE LOGGED IN ===========
	app.get('/profile', auth, function(req, res, next) {
		res.json({message: 'Logged in user, profile page is ok to access', user: req.user})
		console.log('Logga inn')
	});

	// USER EDIT PROFILE =====================================
	router.route('/api/editprofile/:user_id')
		.get(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				console.log('uppdate user 1 steg')
				if (err) {
					res.send(err);
				}
				else {
					res.send(user);
					
				}

		})})

		.put(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					console.log('userprofile update, user: ', user)
					user.name.first = req.body.name.first;
					user.name.last = req.body.name.last;
					user.email = req.body.email;
					user.hcp = req.body.hcp;

					user.save(function (err) {
						if (err) {
							res.send(err);
						}
						else {
							res.json({ message: 'User updated!' , user: user});
						}
					})
				};

			})
		})

	// ASIGN THE ROUTE TO THE APP =========================
	app.use(router);

}


// Local functions to check access in middleware ==================
var auth = function(req, res, next) { 
	if (!req.isAuthenticated()) {
		res.send(401); 
	} else {
		console.log('auth ok')
		next();
		} 
};

var checkAdmin = function(req, res, next) { 
	if (!req.isAuthenticated()) {
		console.log('not loggedin, so no admin')
		res.send(401); 
	} else {
		if (req.user.isAdmin) {
			console.log ('this is an admin user!!')
			next();

		} else {
			console.log('logged in user, but no admin!')
			res.send(401);
		}
	}
};

var correctUser = function (req, res, next) {
	var editUser = {};
			
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.send(err);
		}
		else {
			editUser = user;
		}
		});

	if(req.user = editUser) {
		console.log('Your are alowed to edit this user');
		next();
	} else {
		console.log('You are not alowed to edit this user!!!!')
		res.send(401);
	}

}
