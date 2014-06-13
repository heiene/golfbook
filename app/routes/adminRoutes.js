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

	router.route('/api/users/:user_id')
		/*.put(function (req, res) {
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
		
		})*/
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
	
	app.use(router);

}





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
