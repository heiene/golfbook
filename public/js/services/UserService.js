angular.module('UserService', [])
	.factory('Users', ['$http', function($http) {

	return {
		// call to get all users
		get : function() {
			return $http.get('/api/users')
		},

		// call to POST and create a new user
		create : function(userData) {
			return $http.post('api/signup', userData);
		},

		// call to DELETE a user
		delete : function(id) {
			return $http.delete('/api/users/' + id);
		},
		// call to update a user
		put : function(id) {
			return $http.put('/api/users/' + id);
		},
		// call to get a user by id
		getById: function(id) {
			return $http.get('/api/users/' + id);
		},

		login: function(userData) {
			return $http.post('/login', userData);
		},
		logout: function() {
			return $http.get('/logout');
		},
		testLogin: function() {
			return $http.get('/profile');
		} 

	}
	
}]);