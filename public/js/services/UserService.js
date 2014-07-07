angular.module('UserService', [])

	.factory('UserRoutes', ['$http' , 'CurrentUser', function($http, currentUser) {
		$http.defaults.headers.common['Authorization'] = currentUser.basicString || '';
	return {
		signup: function(userData) {
			return $http.post('/api/users', userData);
		},
        login: function(userData) {
            return $http.post('/api/login', userData);
        },
        logout: function() {
            return $http.get('/logout');
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
            user: { username: '',
                    password: '',
                    isAdmin: false,
                    _id: ''
                    },
            basicString: ''      //Denne må vel regnes ut i login og signup funksjon i controller!
        }
}]);