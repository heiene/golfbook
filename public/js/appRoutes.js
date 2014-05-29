angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// nerds page that will use the NerdController
		.when('/users', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		})

		// 
		.when('/courses', {
			templateUrl: 'views/course.html',
			controller: 'CourseController'	
		});

	$locationProvider.html5Mode(true);

}]);
