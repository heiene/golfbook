angular.module('UserCtrl', []).controller('UserController', function($scope, $http, Users) {
	$scope.formData = {};


	Users.get()
		.success(function(data) {
			$scope.users = data;
	});
 	$scope.createUser = function() {

		// call the create function from our service (returns a promise object)
		Users.create($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.users = data; // assign our new list of users
			});
			
	};

	$scope.deleteUser = function(id) {

		Users.delete(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.users = data; // assign our new list of users
			});
	};

	$scope.updateUser = function(id) {

		Users.put(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.users = data; // assign our new list of users
			});
	};

	$scope.tagline = 'Controller for users, or golfer';	

});