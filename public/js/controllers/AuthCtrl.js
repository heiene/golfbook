angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$http', '$location', 'UserRoutes', 'CurrentUser' ,function( $scope, $http, $location, UserRoutes, CurrentUser) {
	$scope.formData = {};

    $scope.signupUser = function() {

        // call the create function from our service (returns a promise object)
        UserRoutes.signup($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, b, c, a) {
                $scope.formData = {}; // clear the form

                if (data.user) {

                    CurrentUser.isLogged = true;
                    CurrentUser.user = data.user;
                    CurentUser.basicString = 'utregna basicstring i signup';

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                    $location.path('/profile')
                } else {
                    console.log('Dropper data, starter paa b:::::', b, 'c:::::', c(), 'a::::', a)
                }
            })
            .error(function(k,l,m,n,o,p){
                console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
                if (l==401) {
                    $scope.message = 'username: "' + $scope.formData.username + '" is taken, try again!'
                    $scope.formData.username = '';
                }
            })
    };

    $scope.loginUser = function() {

        // call the create function from our service (returns a promise object)
        UserRoutes.login($scope.formData)
            // if successful creation, call our get function to get all the new users
            .success(function(data, b, c, a) {
                $scope.formData = {}; // clear the form
                if (data.user) {
                    CurrentUser.isLogged = true;
                    CurrentUser.user = data.user;
                    CurentUser.basicString = 'utregna basicstring i login';

                    console.log('DATA:',data, 'CurrentUser', CurrentUser);

                    $location.path('/profile')
                } else {
                    console.log('Dropper data, starter paa b:::::', b, 'c:::::', c(), 'a::::', a)
                }
            })
            .error(function(k,l,m,n,o,p){
                console.log('K',k,'l', l,'m',m,'n',n,'o',o,'p',p)
                if (l==401) {

                }
            })
    };

    $scope.logoutUser = function() {
        UserRoutes.logout()
            .success(function (a,b,c,d,e,f) {
            console.log('Success logout','a', a, 'b', b, 'c', c, 'd', d, 'e', e, 'f', f)
            })
            .error(function (a,b,c,d,e,f) {
                console.log('Error logout','a', a, 'b', b, 'c', c, 'd', d, 'e', e, 'f', f)
            })
        CurrentUser.isLogged = false;
        CurrentUser.user = '';
        CurrentUser.basicString = 'Logga ut';

    };

}]);

