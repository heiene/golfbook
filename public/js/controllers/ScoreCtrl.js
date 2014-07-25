/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', 'GolfCourses',function($scope, $http, $location, GolfCourses) {
        $scope.tagline = 'Rounds should be displayed here'
        $scope.scoreData = {};
        $scope.scoreData.hole_score = [];

        $scope.golfCourses = GolfCourses.courses;
    }]);