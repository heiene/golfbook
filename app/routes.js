var User = require('./models/user');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
	});

	// sample api route
	app.get('/api/users', function(req, res) {
		// use mongoose to get all users in the database
		User.find(function(err, users) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err);
			}
			res.json(users); // return all users in JSON format
		});
	});

	// route to handle creating (app.post)

	app.post('/api/users', function(req, res) {

		// create a user, information comes from AJAX request from Angular
		User.create({
			userName : req.body.userName
		}, function(err, user) {
			if (err) {
				res.send(err);
			}
			// get and return all the users after you create another
			User.find(function(err, users) {
				if (err) {
					res.send(err)
				}
				res.json(users);
			});
		});

	});
	// route to handle delete (app.delete)
	app.delete('/api/users/:user_id', function(req, res) {
		console.log('request id in delete', req.params)

		User.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err) {
				res.send(err);
			}
			// get and return all the todos after you create another
			User.find(function(err, users) {
				if (err) {
					res.send(err)
				}
				res.json(users);
			});
		});
	});

	app.put('/api/users/:user_id', function(req, res) {
		console.log('request id in PUT', req.params)

		User.findById(req.params.user_id, function(err, user) {
			if (err) {
				res.send(err);
			}
			user.userName = req.body.userNames
			user.save(function(err) {
				if (err) {
					res.send(err)
				}
				res.json(users);

			});
		});
	});

	app.get('/api/users/:user_id', function(req, res) {
		console.log('request id in get by id', req.params)

		User.findById(req.params.user_id, function(err, user) {
			if (err) {
				res.send(err);
			}
			res.json(user);

		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};