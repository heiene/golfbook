module.exports = function (app, express) {

	var router 					= express.Router();
	var usersController 		= require('../controllers/usersController');
	var authController 			= require('../controllers/authController');
	var golfroundController  	= require('../controllers/golfRoundController');
	var golfcourseController 	= require('../controllers/golfCourseController');

// ======== Her definerer vi rutene for backend ==============

	// ---- User Routes --------------------
    router.route('/login')
        .get(authController.isAuthenticated, usersController.login);

  	// Users oversikt - returnerer bare alle brukere, ikke noe authendikasjon nødvendig per nå
	router.route('/users')
        .get(authController.isAuthenticated, usersController.getUsers)
        .post(authController.isAuthenticated, isAdmin, usersController.postUser);

  	// Alt som har med 1 user å gjøre
	router.route('/users/:user_id')
  		.get(authController.isAuthenticated, usersController.getUser)
		.put(authController.isAuthenticated, isAuthorized , usersController.putUser)
		.delete(authController.isAuthenticated, isAdmin, usersController.deleteUser);


	// ----- Golf Rounds Routes ------------
	router.route('/golfrounds')
		.get(authController.isAuthenticated, golfroundController.getGolfrounds)
		.post(authController.isAuthenticated, golfroundController.postGolfround);



	// ----- Golf Course Routes ------------
	router.route('/golfcourses')
		.get(authController.isAuthenticated, golfcourseController.getGolfCourses)
		.post(authController.isAuthenticated, golfcourseController.postGolfCourse);


	// Setter alle backend ruter til å bruke /api
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
		res.send(403);
	} else {
		console.log('user is admin', req.user)
		next();	
	}	
};

// Denne sjekker om bruker som prøver å gjøre noe enten er admin, eller
// bruker prøver å gjøre no med sin egen bruker, for å unngå at noen andre brukere
// kan endre på din bruker (med mindre han er admin)
var isAuthorized = function (req, res, next) {
	if (req.user.isAdmin || req.user._id == req.params.user_id) {
		console.log('alllowed to do stuff with this user, Userid for requesting user: ', req.user._id, ', user id for user to change: ', req.params.user_id, '"admin" user id: 53adcfe6d6d2cdd36e000001')
		next();
	} else {
		console.log('not allowed to temper with this user!!! Userid for requesting user: ', req.user._id, ', user id for user to change: ', req.params.user_id, '"admin" user id: 53adcfe6d6d2cdd36e000001')
		res.send(401);
	}
}