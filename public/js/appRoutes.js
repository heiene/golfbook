angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {


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
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
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
        .when('/scores', {
            templateUrl: 'views/scores.html',
            controller: 'ScoreController'
        })
        .when('/tournaments', {
            templateUrl: 'views/tournaments.html',
            controller: 'ScoreController'
        })
        .when('/pictures', {
            templateUrl: 'views/pictures.html',
            controller: 'AuthController'
        })
        .when('/addscore', {
            templateUrl: 'views/addscore.html',
            controller: 'ScoreController'
        })
        .when('/halloffame', {
            templateUrl: 'views/halloffame.html',
            controller: 'ScoreController'
        })
        .when('/golfcourses', {
            templateUrl: 'views/golfcourses.html',
            controller: 'CourseController'
        })
        .otherwise({
            redirectTo: '/'
        });


    var interceptor = ['$rootScope', '$q', function (scope, $q) {
        function success(response) {
            return response;
        }
        function error(response) {
            var status = response.status;
            if (status == 401) {
                window.location = "/";
                return;
            }
            if (status == 403) {
                window.alert('You are not admin!!! Get out of here!')
                window.location = "/profile";
                return;
            }

            // otherwise
            return $q.reject(response);
        }
        return function (promise) {
            return promise.then(success, error);
        }
    }];
    $httpProvider.responseInterceptors.push(interceptor);

}]);
