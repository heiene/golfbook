angular.module('UserService', [])
	
	.factory('UserRoutes', ['$http' , 'CurrentUser', function($http, currenUser) {
		$http.default.headers.common['Authorization'] = currentUser.basicString;
	return {
		// call to get all users
		get : function() {
			return $http.get('/api/users')
		},

		// call to POST and create a new user
		create : function(userData) {
			return $http.post('/api/signup', userData);
		},

		// call to DELETE a user
		delete : function(id) {
			return $http.delete('/api/users/' + id);
		},
		// call to update a user
		put : function(id) {
			return $http.put('/api/users/' + id);
		},
		updateUser : function(id,userData) {
			return $http.put('/api/editprofile/' + id, userData);
		},
		// call to get a user by id
		getById: function(id) {
			return $http.get('/api/users/' + id);
		},

		login: function(userData) {
			return $http.post('/api/login', userData);
		},
		logout: function() {
			return $http.get('/logout');
		},
		testLogin: function() {
			return $http.get('/profile');
		} 

	}
	
}])
	.factory('CurrentUser', ['$http', function($http) {

	return {
		isLogged: false,
		user: "",
		basicString: //regn ut den Tor Einar! 

	}
}]);