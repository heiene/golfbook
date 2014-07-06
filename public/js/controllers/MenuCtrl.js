/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('MenuCtrl', [])
    .controller('MenuController', ['$scope', 'CurrentUser', function($scope, CurrentUser) {

        $scope.loggedIn = CurrentUser.isLogged;
        var menuToggle = false;
        $scope.classToggle = '';
        $scope.toggleMenu = function () {
            menuToggle = !menuToggle;
            if (menuToggle) {
                $scope.classToggle = 'show-nav';
            } else {
                $scope.classToggle = '';
            }
        }

    }]);