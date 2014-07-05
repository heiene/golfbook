angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


	$locationProvider.html5Mode(true);

}]);
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
    .when('/rounds', {
        templateUrl: 'views/rounds.html',
        controller: 'RoundController'
    })
    .when('/rounds/add', {
        templateUrl: 'views/addround.html',
        controller: 'RoundController'
    })

    .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthController'
    })

    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
    })
    .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'UserController'
    })
    .when('/editprofile', {
        templateUrl: 'views/editprofile.html',
        controller: 'UserController'
    })
    .when('/logout', {
        templateUrl: 'views/home.html',
        controller: 'AuthController'
    })
    .otherwise({
        redirectTo: '/'
    });
