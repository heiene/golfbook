angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// users page that will use the UserController
		.when('/users', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		})

		// Courses for admin use on the courses
		.when('/courses', {
			templateUrl: 'views/course.html',
			controller: 'CourseController'	
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'UserController'	
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'UserController'	
		})

		.when('/redirect', {
			templateUrl: 'views/redirect.html',
			controller: 'MainController'	
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'UserController'	
		})
		.when('/editprofile', {
			templateUrl: 'views/editprofile.html',
			controller: 'UserController'	
		})

		.otherwise({
        	redirectTo: '/'
      	});

	$locationProvider.html5Mode(true);

}]);
