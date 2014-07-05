angular.module('UserCtrl', []).controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'UserRoutes', 'CurrentUser' ,function($rootScope, $scope, $http, $location, UserRoutes, CurrentUser) {
	$scope.formData = {};
	$scope.currentUser = CurrentUser.user;

	UserRoutes.get()
		.success(function(data) {
			$scope.users = data;
			$scope.message = '';
	});
 	/*$scope.createUser = function() {

		// call the create function from our service (returns a promise object)
		Users.create($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data,b,c,a) {
				$scope.formData = {}; // clear the form
				
				if (data.user) {
					console.log('DATA:',data, 'b:::::', b, 'c:::::', c, 'a::::', a)
					$rootScope.user = data.user
					this.loggedin.user = data.user;
					console.log('login success with user')
					$location.path('/profile')
				} else {
					console.log('Dropper data, starter paa b:::::', b, 'c:::::', c(), 'a::::', a)
					console.log('errorlocation')
				}
			})



			.error(function(k,l,m,n,o,p){
				



				console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
				if (l==401) {
					$scope.message = 'username: "' + $scope.formData.username + '" is taken, try again!'
					$scope.formData.username = '';
					$scope.formData.password = '';
				}


			})
	};*/

	/*$scope.loginUser = function() {

		// call the create function from our service (returns a promise object)
		Users.login($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.formData = {}; // clear the form
				$scope.test2 = 'test2'
				$scope.currentUser.username = data.user.username; //DENNE VIRKER IKKE AV EN ELLER ANNEN GRUNN....
				$rootScope.user = data.user
				if (data.user) {
					console.log('kommer jeg til successen, er jeg logga inn!!!!', 'currentuser:', $scope.currentUser, data.user.username)
					$location.path('/profile')
				} else {
					console.log(data, 'errorlocation')
				}
			})
			.error(function(k,l,m,n,o,p){
				



				console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
				if (l==401) {
					// $scope.message = 'username: "' + $scope.formData.username + '" is taken, try again!'
					// $scope.formData.username = '';
					// $scope.formData.password = '';
				}


			})
			
	};*/



	$scope.updateUser = function() {

		UserRoutes.put($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
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
			.success(function(data) {
				$rootScope.user = data.user
				$location.path('/profile')
		});
	}




	$scope.tagline = 'Controller for users, or golfer';	

}]);

