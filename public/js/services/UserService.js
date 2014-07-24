angular.module('UserService', [])

	.factory('UserRoutes', ['$http' , 'CurrentUser', '$window', function($http, CurrentUser, $window) {

        $http.defaults.headers.common['Authorization'] = CurrentUser.basicString || '';
	return {
		createUser: function(userData) {
			return $http.post('/api/users', userData);
		},
        login: function(userData) {
            return $http.get('/api/login');
        },
        getUsers: function() {
            return $http.get('/api/users')
        },
        // call to get a user by id
        getUser: function(id) {
            return $http.get('/api/users/' + id);
        },
        // call to update a user
        updateUser: function(id) {
            return $http.put('/api/users/' + id);
        },
		deleteUser: function(id) {
			return $http.delete('/api/users/' + id);
		},
        getScores: function() {
            return $http.get('/api/scores');
        },
        postScore: function(scoreData) {
            return $http.post('/api/scores', scoreData);
        }
    }
    }])
    .factory('CurrentUser',  ['$window', function($window) {
        var newUser =  {
            isLogged: false,
            user: '',
            basicString: ''
            };
        var oldUser;

        if ($window.sessionStorage.currentUser) {
            oldUser = JSON.parse($window.sessionStorage.currentUser);
        }

        return oldUser ||newUser;
    }])

    .factory('UserAuth', ['CurrentUser', '$http','$location', '$window',  function(CurrentUser, $http, $location, $window) {

        var factory = {};

        factory.beforeLogin = function (userData) {
            var basic = 'Basic ' + btoa(userData.username+":"+userData.password);

            // Setter basic string i header og CurrentUser
            $http.defaults.headers.common['Authorization'] = basic;
            CurrentUser.basicString = basic;
        };

        factory.afterLoginSuccess = function (data) {

            // Setter User object til CurrentUser.user etter at passordet er strippa av.
            CurrentUser.user = data.user;
            CurrentUser.isLogged    = true;

            // Lagrer user is session
            $window.sessionStorage.currentUser = JSON.stringify(CurrentUser);
            $location.path('/profile');
        };

        factory.logout = function () {
            CurrentUser.isLogged = false;
            CurrentUser.user = '';
            CurrentUser.basicString = '';
            $http.defaults.headers.common['Authorization'] = '';

            // Fjerner session
            $window.sessionStorage.removeItem("currentUser");

        };

        return factory;

    }]);