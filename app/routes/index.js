module.exports = function (app, express) {

	var router 				= express.Router();
	var usersController 	= require('../controllers/usersController');
	var authController 		= require('../controllers/authController');

	
	router.route('/signup')
  		.post(authController.userSignup, usersController.postUser)


	router.route('/users')
  		.get(usersController.getUsers);

	// Create endpoint handlers for /beers/:beer_id
	router.route('/users/:user_id')
  		.get(authController.isAuthenticated, usersController.getUser)
		.put(authController.isAuthenticated, isAuthorized , usersController.putUser)
		.delete(authController.isAuthenticated, isAdmin, usersController.deleteUser);

	// Register all our routes with /api
	app.use('/api', router);

};

// ======== Her legger vi inn middleware funksjoner ============

//Lokal funksjon som sjekker om bruker er admin, etter at første sjekk på
//om bruker er logget inn er utført. Må muligens legge inn en sjekk på om
//bruker er logget inn i selve funksjonen, men gjøres i hver route når man
//sjekker brukernavn og passord
var isAdmin = function (req, res, next) {
	if (!req.user.isAdmin) {
		console.log('user not admin', req.user)
		res.send(401);
	} else {
		console.log('user is admin', req.user)
		next();	
	}	
};

var isAuthorized = function (req, res, next) {
	if (req.user.isAdmin || req.user._id == req.params.user_id) {
		console.log('alllowed to do stuff with this user, Userid for requesting user: ', req.user._id, ', user id for user to change: ', req.params.user_id, '"admin" user id: 53adcfe6d6d2cdd36e000001')
		next();
	} else {
		console.log('not allowed to temper with this user!!! Userid for requesting user: ', req.user._id, ', user id for user to change: ', req.params.user_id, '"admin" user id: 53adcfe6d6d2cdd36e000001')
		res.send(401);
	}
}