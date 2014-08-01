/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', 'GolfCourses', 'UserRoutes', 'CurrentScoreRound' ,function($scope, $http, $location, GolfCourses, UserRoutes, CurrentScoreRound) {
        $scope.tagline = 'Adding score'
        $scope.scoreData = CurrentScoreRound.currentRound;
        console.log('location endring:',$scope.scoreData)
        $scope.selectedCourse = CurrentScoreRound.selectedCourse;
        $scope.selectedNumberOfHoles = 0;
        $scope.golfCourses = GolfCourses;



        $scope.populateHoles = function () {
            $scope.scoreData.hole_score = [];
            for (i = 0; i< $scope.selectedNumberOfHoles; i++) {
                var hole = {};
                hole.strokes = $scope.selectedCourse.holes[i].par;
                hole.puts = 2;
                hole.collapse = true;
                hole.strokeSliderOptions = {
                    "from": 1,
                    "to": (($scope.selectedCourse.holes[i].par*2)+1),
                    "step": 1,
                    "smooth": false,
                    "value": $scope.selectedCourse.holes[i].par
                };
                hole.putSliderOptions = {
                    "from": 1,
                    "to": 6,
                    "step": 1,
                    "smooth": false,
                    "value": 2
                };
                hole.restSliderOptions = {
                    "from": 1,
                    "to": 6,
                    "step": 1,
                    "smooth": false,
                    "value": 0
                }
                $scope.scoreData.hole_score.push(hole);

            }
            console.log('REtt før location endring',$scope.scoreData)
            CurrentScoreRound.currentRound = $scope.scoreData;
            CurrentScoreRound.selectedCourse = $scope.selectedCourse;
//            var scoreCard = document.getElementById("register-score");
//            (angular.element(scoreCard)).removeClass('right')
            $location.path('/scorecard');

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

        $scope.toggleHoleScoreVisibility = function(index) {
            $scope.scoreData.hole_score[index].collapse = !$scope.scoreData.hole_score[index].collapse;
        };

        $scope.calculateScoreHole = function (index) {
            console.log($scope.scoreData.hole_score[index].strokes);
            $scope.scoreData.hole_score[index].scoreSet = true;
            $scope.toggleHoleScoreVisibility(index);
        }

        $scope.setScorePlayer = function (index, id) {
            var holeScoreEl = document.getElementById(id);
            var el = (angular.element(holeScoreEl)).find("paper-slider")
            console.log(holeScoreEl, el)
            $scope.scoreData.hole_score[index].player = el[0].value;
            $scope.toggleHoleScoreVisibility(index+1,id);

        }
    }]);