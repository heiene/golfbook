angular.module('UserService', [])

	.factory('UserRoutes', ['$http' , 'CurrentUser', function($http, currentUser) {

	return {
		signup: function(userData) {
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
		}
	}
    }])

	.factory('CurrentUser', [ function() {

        return {
            isLogged: false,
            user: '',
            basicString: ''      //Denne må vel regnes ut i login og signup funksjon i controller!
        }

    }])

    .factory('UserAuth', ['CurrentUser', '$http','$location',  function(CurrentUser, $http, $location) {
        var factory = {};

        factory.beforeLogin = function (userData) {
            var basic = 'Basic ' + btoa(userData.username+":"+userData.password);
            $http.defaults.headers.common['Authorization'] = basic;

            CurrentUser.basicString = basic;
            CurrentUser.isLogged    = true;

            //
            //TODO: evt en Session storage av CurrentUser objectet
            //

        };

        factory.afterLoginSuccess = function (data) {

            // Setter User object til CurrentUser.user etter at passordet er strippa av.
            CurrentUser.user = data.user;
            console.log('Etter login er Currentuser', CurrentUser, data);
            $location.path('/profile');
        };

        factory.logout = function () {
            CurrentUser.isLogged = false;
            CurrentUser.user = '';
            CurrentUser.basicString = '';
            $http.defaults.headers.common['Authorization'] = '';


            console.log('Etter logut er Currentuser', CurrentUser);
        };

        return factory;

    }]);