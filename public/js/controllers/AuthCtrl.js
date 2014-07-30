angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$http', '$location', 'UserRoutes', 'CurrentUser', 'UserAuth' ,function( $scope, $http, $location, UserRoutes, CurrentUser, UserAuth) {
	$scope.formData = {};


    $scope.loginUser = function() {
        getFormData();
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

    var getFormData =function () {
        var loginForm = document.getElementById("loginForm");
        var el = (angular.element(loginForm)).find("paper-input")
        console.log(el)
        $scope.formData.username = el[0].value;
        $scope.formData.password = el[1].value;
        el[0].value = null;
        el[1].value = null;

    }

}]);

