angular.module('AdminCtrl', [])
.controller('AdminController', ['$scope', '$http', '$location',function($scope, $http, $location) {
    $scope.deleteUser = function(id) {

        UserRoutes.delete(id)
            // if successful creation, call our get function to get all the new users
            .success(function(data, status, headers, config) {
                // $scope.users = Users.get(); // assign our new list of users
            });
    };

}]);