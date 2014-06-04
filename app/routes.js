
var User = require('./models/user');

//Middleware for router

module.exports = function(app, express) {

	var router = express.Router();
	
	router.use(function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url,'Something is happening!!');

		// continue doing what we were doing and go to the route
		next();	
	});

// User Route ====================================================

	router.route('/users')
		
		.post(function (req, res) {
			User.create({
					userName: req.body.userName,
					password: req.body.password,
					isAdmin: req.body.isAdmin
				}, function (err, user) {
					if (err) {
						res.send(err);
					}
					else {

						res.json({message: 'User created', user: user})
						
					}
				})

		})

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

	router.route('/users/:user_id')
		.get(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					res.json(user);
				}
			})
		})

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

		.delete(function (req, res) {
			User.remove( {
				_id: req.params.user_id
			}, function (err, user) {
				if (err) {
					res.send(err);
				}
				else {
					res.json({ message: 'User deleted!', user: user });
				}
			})
		})

	// home page route (http://localhost:8080)
	router.get('/', function(req, res) {
		res.send('API ROOT');	
	});



	app.use('/api', router);
};