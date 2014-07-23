/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('MenuCtrl', [])
    .controller('MenuController', ['$scope', 'CurrentUser', 'UserAuth', function($scope, CurrentUser, UserAuth) {

        var drawerPanel = document.getElementById('drawerPanel');

        $scope.currentUser = {};
        $scope.loggedIn = false;

        //DONE: Må sette opp en lik $scope.loggedInAdmin for admin, for å kunne gi en annen meny basert på admin.
        //TODO: Man har faktisk tilgang på logged inn rutene så lenge den siden ikke henter noe fra server, bør legge en access controll på appRoutes også.

        // Satt opp en watch som ser på endringer på CurrentUser.isLogged, og setter scope.loggedIn lik den nye verdien.
        $scope.$watch(function () {
                return CurrentUser.isLogged;
            },
            function(newVal, oldVal) {
                $scope.loggedIn = newVal;
                if($scope.loggedIn) {
                    $scope.currentUser = CurrentUser.user;
                } else {
                    $scope.currentUser = {};
                }
            }, true);

        $scope.toggleMenu = function () {
            drawerPanel.togglePanel();
        }

        $scope.showMenu = function() {
           drawerPanel.openDrawer();
        }

        $scope.hideMenu = function() {
            drawerPanel.closeDrawer();
        }

        $scope.logout = function() {
            // Trenger ikke logge av server, fjerner bare basic auth fra header og blanker CurrentUser objektet i denne
            UserAuth.logout();
        }

    }]);