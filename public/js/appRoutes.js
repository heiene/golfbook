angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true);

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MenuController'
        })
        .when('/users', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'AuthController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })
        .when('/logout', {
            templateUrl: 'views/home.html',
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
        .when('/rounds', {
            templateUrl: 'views/rounds.html',
            controller: 'RoundController'
        })
        .when('/tournaments', {
            templateUrl: 'views/tournaments.html',
            controller: 'RoundController'
        })
        .when('/addround', {
            templateUrl: 'views/addround.html',
            controller: 'RoundController'
        })
        .when('/halloffame', {
            templateUrl: 'views/halloffame.html',
            controller: 'RoundController'
        })
        .when('/golfcourses', {
            templateUrl: 'views/golfcourses.html',
            controller: 'CourseController'
        })
        .otherwise({
            redirectTo: '/'
        });




}]);
