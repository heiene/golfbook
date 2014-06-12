
var User = require('../models/user');

//Middleware for router

module.exports = function(app, express, passport) {

	var router = express.Router();
	
	router.use('/api/users', function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'User Route is entered!!');

		// continue doing what we were doing and go to the route
		next();	
	});

// User Route ====================================================

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

	router.route('/api/users/:user_id')
		.get(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					res.send(user);
					
				}

		})})

		.put(correctUser, function(req, res) {

		})

	app.use(router);

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