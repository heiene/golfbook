angular.module('UserCtrl', []).controller('UserController', function($rootScope, $scope, $http, $location, Users) {
	$scope.formData = {};


	Users.get()
		.success(function(data) {
			$scope.users = data;
			$scope.message = '';
	});
 	$scope.createUser = function() {

		// call the create function from our service (returns a promise object)
		Users.create($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data,b,c,a) {
				$scope.formData = {}; // clear the form
				
				if (data.user) {
					console.log('hit må jeg komme DATA::::',data, 'b:::::', b, 'c:::::', c, 'a::::', a)
					$rootScope.user = data.user.userName
					console.log('kommer jeg til successen?')
					$location.path('/redirect')
				} else {
					console.log('Dropper data, starter paa b:::::', b, 'c:::::', c(), 'a::::', a)
					console.log('errorlocation')
				}
			})



			.error(function(k,l,m,n,o,p){
				



				console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
				if (l==401) {
					$scope.message = 'User is in use'
					console.log('dette funker')
				}


			})
			// .failure(function (data,b,c,a,f) {
			// 	$scope.formData = {}; // clear the form
			// 	console.log('failure:',data, 'b:::::', b, 'c:::::', c, 'a::::', a, 'f:::::::::',f)
			// })
			
	};

	$scope.loginUser = function() {

		// call the create function from our service (returns a promise object)
		Users.login($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.formData = {}; // clear the form
				
				if (data.user) {
					console.log('kommer jeg til successen, er jeg logga inn!!!!', data)
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

	$scope.logutUser = function() {
		$rootScope.user = null
		Users.logout();
		console.log($rootScope)
	};

	$scope.testLogin = function() {
		Users.testLogin();
	}


	$scope.tagline = 'Controller for users, or golfer';	

});

