module.exports = function (app, express, passport) {
	require('./userRoutes')(app, express, passport); // configure our userroutes
	require('./adminRoutes')(app, express, passport);
	require('./signInRoutes')(app, express, passport); // signinroutes

	
}