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
        .when('/rounds', {
            templateUrl: 'views/rounds.html',
            controller: 'RoundController'
        })
        .when('/tournaments', {
            templateUrl: 'views/tournaments.html',
            controller: 'RoundController'
        })
        .when('/pictures', {
            templateUrl: 'views/pictures.html',
            controller: 'AuthController'
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


    var interceptor = ['$rootScope', '$q', function (scope, $q) {
        function success(response) {
            return response;
        }
        function error(response) {
            var status = response.status;
            if (status == 401) {
                window.location = "/login";
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
