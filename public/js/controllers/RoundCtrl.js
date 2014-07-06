/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('RoundCtrl', [])
    .controller('RoundController', ['$scope', '$http', '$location', 'GolfCourses',function($scope, $http, $location, GolfCourses) {
        $scope.tagline = 'Rounds should be displayed here'

        $scope.golfCourses = GolfCourses.courses;
    }]);