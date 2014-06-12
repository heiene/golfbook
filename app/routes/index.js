module.exports = function (app, express, passport) {
	require('./adminRoutes')(app, express, passport);
	require('./userRoutes')(app, express, passport); // configure our userroutes
	require('./signInRoutes')(app, express, passport); // signinroutes

	
}