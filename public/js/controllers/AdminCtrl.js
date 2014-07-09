angular.module('AdminCtrl', [])

    .controller('AdminController', ['$scope', '$http', '$location', 'UserRoutes',function($scope, $http, $location, UserRoutes) {

        $scope.formData = {};

        UserRoutes.getUsers()
            .success(function(data, status, headers, config) {
                $scope.users = data;
            });

        $scope.createUser = function() {

            // call the create function from our service (returns a promise object)
            UserRoutes.createUser($scope.formData)
                // if successful creation, call our get function to get all the new users
                .success(function(data, status, headers, config) {
                    $scope.formData = {}; // clear the form

                    if (data.user) {
                        console.log('User is created by admin', data)

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

        $scope.deleteUser = function(id) {

            UserRoutes.deleteUser(id)
                // if successful creation, call our get function to get all the new users
                .success(function(data, status, headers, config) {
                    // $scope.users = Users.get(); // assign our new list of users
                });
        };



    }]);