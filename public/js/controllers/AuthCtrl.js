angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$http', '$location', 'UserRoutes', 'CurrentUser' ,function( $scope, $http, $location, UserRoutes, CurrentUser) {
	$scope.formData = {};

    $scope.signupUser = function() {

        // call the create function from our service (returns a promise object)
        UserRoutes.signup($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, status, headers, config) {
                $scope.formData = {}; // clear the form

                if (data.user) {

                    loginActions(data.user);

                    console.log('headers:',headers)
                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                } else {
                    console.log('succcess men ikke user object, returnert: ', data, status, headers, config)
                }
            })
            .error(function(data, status, headers, config){
                console.log('Error, returnert: ', data, status, headers, config)
                if (status==401) {
                    $scope.message = 'username: "' + $scope.formData.username + '" is taken, try again!'
                    $scope.formData.username = '';
                }
            })
    };

    $scope.loginUser = function() {

        // call the create function from our service (returns a promise object)
        UserRoutes.login($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, status, headers, config) {
                $scope.formData = {}; // clear the form
                if (data.user) {

                    loginActions(data.user);

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                } else {
                    console.log('succcess men ikke user object, returnert: ', data, status, headers, config)
                }
            })
            .error(function(data, status, headers, config){
                console.log('Error, returnert: ', data, status, headers, config)
                if (status==401) {
                    $location.path('/login');
                }
            })
    };

    $scope.logoutUser = function() {
        UserRoutes.logout()
            .success(function (data, status, headers, config) {
                CurrentUser.isLogged = false;
                CurrentUser.user = '';
                CurrentUser.basicString = 'Logga ut';
                console.log('Success logout, returnert: ', data, status, headers, config)
            })
            .error(function (data, status, headers, config) {
                console.log('Error logout, returnert: ', data, status, headers, config)
            })


    };
    var loginActions = function(user) {
        var userCoded = btoa(user.username+":"+user.password);
        CurrentUser.isLogged = true;
        CurrentUser.user = user;
        CurrentUser.basicString = 'Basic '+userCoded;
        $location.path('/profile')
    }

}]);

