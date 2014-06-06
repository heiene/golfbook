angular.module('UserCtrl', []).controller('UserController', function($scope, $http, $location, Users) {
	$scope.formData = {};


	Users.get()
		.success(function(data) {
			$scope.users = data;
			$scope.message = 'null';
	});
 	$scope.createUser = function() {

		// call the create function from our service (returns a promise object)
		Users.create($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(a,b,c,data) {
				$scope.formData = {}; // clear the form
				console.log('hit må jeg komme a:',a, 'b:', b, 'c:', c, 'data:', data)
				if (data.user) {
					console.log('kommer jeg til successen?')
					$location.path('/redirect')
				} else {
					console.log('errorlocation')
				}
			});
			
	};

	$scope.loginUser = function() {

		// call the create function from our service (returns a promise object)
		Users.login($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.formData = {}; // clear the form
				
				if (data.user) {
					console.log('kommer jeg til successen, er jeg logga inn?', data)
					$location.path('/loginruta')
				} else {
					console.log(data, 'errorlocation')
				}
			});
			
	};

	$scope.deleteUser = function(id) {

		Users.delete(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				// $scope.users = Users.get(); // assign our new list of users
			});
	};

	$scope.updateUser = function(id) {

		Users.put(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				// $scope.users = Users.get(); // assign our new list of users
			});
	};

	$scope.tagline = 'Controller for users, or golfer';	

});