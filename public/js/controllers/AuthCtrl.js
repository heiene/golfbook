angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$http', '$location', 'UserRoutes', 'CurrentUser' ,function( $scope, $http, $location, UserRoutes, CurrentUser) {
	$scope.formData = {};

    $scope.signupUser = function() {

        // call the create function from our service (returns a promise object)
        UserRoutes.signup($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, status, headers, config) {
                $scope.formData = {}; // clear the form

                if (data.user) {
                    console.log('headers:',headers)
                    CurrentUser.isLogged = true;
                    CurrentUser.user = data.user;
                    CurentUser.basicString = 'utregna basicstring i signup';

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                    $location.path('/profile')
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
                    CurrentUser.isLogged = true;
                    CurrentUser.user = data.user;
                    CurentUser.basicString = 'utregna basicstring i login';

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                    $location.path('/profile')
                } else {
                    console.log('succcess men ikke user object, returnert: ', data, status, headers, config)
                }
            })
            .error(function(data, status, headers, config){
                console.log('Error, returnert: ', data, status, headers, config)
                if (status==401) {

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

}]);

