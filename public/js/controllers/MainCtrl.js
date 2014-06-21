angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope , $http, $location, Users) {

	$scope.formData = {};
	$scope.loggedin = {user: '', session: ''}
	$scope.currentUser = {};
	$scope.useri = {};

	$scope.tagline = 'This is the main controller, should move the create, login and logout user to this controller, handling the session';	

	$scope.createUser = function() {

		// call the create function from our service (returns a promise object)
		Users.create($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data,b,c,a) {
				$scope.formData = {}; // clear the form
				
				if (data.user) {

					console.log('DATA:',data, 'b:::::', b, 'c:::::', c, 'a::::', a)
					$rootScope.user = data.user//funker
					this.currentUser = data.user;
					this.loggedin.user = data.user;//funker ikke
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
	};

	$scope.loginUser = function() {

		// call the create function from our service (returns a promise object)
		Users.login($scope.formData)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.formData = {}; // clear the form
				$scope.test2 = 'test2'
				$scope.useri = {user: 'et eller annetn'};
				$scope.currentUser = {user: 'et eller bannet'};
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
			
	};

	$scope.logoutUser = function() {
		console.log('what is the rootscope before loggout', $rootScope)
		$rootScope.user = null
		Users.logout();
		console.log('what is the rootscope when loggedout', $rootScope)
	};
});