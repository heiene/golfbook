/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('MenuCtrl', [])
    .controller('MenuController', ['$scope', 'CurrentUser', function($scope, CurrentUser) {

        $scope.loggedIn = CurrentUser.isLogged;

    }]);