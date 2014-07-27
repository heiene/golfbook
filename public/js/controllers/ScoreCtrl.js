/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', 'GolfCourses', 'UserRoutes' ,function($scope, $http, $location, GolfCourses, UserRoutes) {
        $scope.tagline = 'Rounds should be displayed here'
        $scope.scoreData = {};
        $scope.selectedCourse = null;
        $scope.selectedNumberOfHoles = 0;
        $scope.scoreData.hole_score = [];
        $scope.golfCourses = GolfCourses;


        $scope.populateHoles = function () {
            for (i = 0; i< $scope.selectedNumberOfHoles; i++) {
                var hole = {};
                $scope.scoreData.hole_score.push(hole);
            }
        };

        $scope.addScore = function () {
            $scope.scoreData.course_id = $scope.selectedCourse._id
            UserRoutes.postScore($scope.scoreData)
                .success(function(data, status, headers, config) {
                    $scope.scoreData = null;
                    $scope.selectedCourse = null;
                    $scope.selectedNumberOfHoles = 0;

                })
                .error(function(data, status, headers, config) {
                    console.log('Error: ', data, 'Status: ', status);
                })
        };

        $scope.toggleHoleScore = function(holeNumber) {
            var holeScoreEl = document.getElementById('hole-score-' + holeNumber);
            console.log(holeScoreEl);
            (angular.element(holeScoreEl)).toggleClass('hidden');
        }
    }]);