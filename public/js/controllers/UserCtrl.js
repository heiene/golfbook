angular.module('UserCtrl', []).controller('UserController', function($rootScope, $scope, $http, $location, Users) {
	$scope.formData = {};
	$scope.loggedin = {user: '', session: ''}
	$scope.currentUser = {};

	Users.get()
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
					$scope.message = 'Username: "' + $scope.formData.userName + '" is taken, try again!'
					$scope.formData.userName = '';
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
				$scope.currentUser.userName = data.user.userName; //DENNE VIRKER IKKE AV EN ELLER ANNEN GRUNN....
				$rootScope.user = data.user
				if (data.user) {
					console.log('kommer jeg til successen, er jeg logga inn!!!!', 'currentuser:', $scope.currentUser, data.user.userName)
					$location.path('/profile')
				} else {
					console.log(data, 'errorlocation')
				}
			})
			.error(function(k,l,m,n,o,p){
				



				console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
				if (l==401) {
					// $scope.message = 'Username: "' + $scope.formData.userName + '" is taken, try again!'
					// $scope.formData.userName = '';
					// $scope.formData.password = '';
				}


			})
			
	};*/

	$scope.deleteUser = function(id) {

		Users.delete(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				// $scope.users = Users.get(); // assign our new list of users
			});
	};

	$scope.updateUser = function() {

		Users.put($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				console.log('yes, user updated!')
				// $scope.users = Users.get(); // assign our new list of users
			});
	};

/*	$scope.logoutUser = function() {
		console.log('is it called')
		$rootScope.user = null
		Users.logout();
		console.log('what is the rootscope when loggedout', $rootScope)
	};*/

	$scope.testLogin = function() {
		Users.testLogin();
	}

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
		console.log('put function for update entered', id, $scope.formData)
		Users.updateUser(id, $scope.formData)
			// if successful update, go back to profile
			.success(function(data) {
				$rootScope.user = data.user
				$location.path('/profile')
		});
	}

	$scope.isAdmin = function() {
		console.log( 'hvem er scopeuser' , $scope.user);
		if ($rootScope.user){
			console.log('am i here?')
			
			if ($rootScope.user.isAdmin) {
				console.log('this is returned', $rootScope.user)
				return true;
				console.log('this is not')

			} else {
				return false;
			}
			
		}
		console.log('or only here?') 
	};


	$scope.tagline = 'Controller for users, or golfer';	

});

