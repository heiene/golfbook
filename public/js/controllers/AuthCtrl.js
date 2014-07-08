angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$http', '$location', 'UserRoutes', 'CurrentUser', 'UserAuth' ,function( $scope, $http, $location, UserRoutes, CurrentUser, UserAuth) {
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
                console.log('Error, returnert, Data: ', data,'status: ',  status, 'header: ', headers, 'config:', config)
                if (status==401) {
                    $scope.message = 'username: "' + $scope.formData.username + '" is taken, try again!'
                    $scope.formData.username = '';
                }
            })
    };

    $scope.loginUser = function() {
        UserAuth.beforeLogin($scope.formData)
        // call the create function from our service (returns a promise object)
        UserRoutes.login($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, status, headers, config) {
                $scope.formData = {}; // clear the form

                UserAuth.afterLoginSuccess(data);

                //TODO: Fjerne denne if elsen tror jeg
               /* if (data.user) {

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                } else {
                    console.log('succcess men ikke user object, returnert: ', data, status, headers, config)
                }*/
            })
            .error(function(data, status, headers, config){
                UserAuth.logout();
                console.log('Error, returnert: ', data, status, headers, config)

                //TODO: Kan fjerne denne if-en også tror jeg
                if (status==401) {
                    $location.path('/login');
                }
            })
    };

    $scope.logoutUser = function() {
        UserAuth.logout();
    };

}]);

