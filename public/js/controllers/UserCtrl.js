angular.module('UserCtrl', []).controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'UserRoutes', 'CurrentUser' ,function($rootScope, $scope, $http, $location, UserRoutes, CurrentUser) {
	$scope.formData = {};
	$scope.currentUser = CurrentUser.user || 'nothing';

	UserRoutes.getUsers()
		.success(function(data, status, headers, config) {
			$scope.users = data;
	});


	$scope.updateUser = function() {

		UserRoutes.put($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data, status, headers, config) {
				console.log('yes, user updated!')
				// $scope.users = Users.get(); // assign our new list of users
			});
	};

	$scope.showAlert = function() {
		
		if ($scope.message) 
			return true;
		else
			return false;
	}

	$scope.clearAlert = function() {
		
		$scope.message = ''
	}

	$scope.updateProfile = function (id) {
		UserRoutes.updateUser(id, $scope.formData)
			// if successful update, go back to profile
			.success(function(data, status, headers, config) {
				$rootScope.user = data.user
				$location.path('/profile')
		});
	}




	$scope.tagline = 'Controller for users, or golfer';	

}]);

