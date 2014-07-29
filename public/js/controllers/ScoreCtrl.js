/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', 'GolfCourses', 'UserRoutes' ,function($scope, $http, $location, GolfCourses, UserRoutes) {
        $scope.tagline = 'Adding score'
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
            var scoreCard = document.getElementById("register-score");
            (angular.element(scoreCard)).removeClass('right')

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

        $scope.toggleHoleScoreVisibility = function(holeNumber, id) {
            var holeScoreEl = document.getElementById(id);
            console.log(holeScoreEl);
            (angular.element(holeScoreEl)).toggleClass('hidden');
        };

        $scope.calculateScoreHole = function (index, id) {
            var holeScoreEl = document.getElementById(id);
            var el = (angular.element(holeScoreEl)).find("paper-slider")

            $scope.scoreData.hole_score[index].strokes = el[0].value;
            $scope.scoreData.hole_score[index].puts = el[1].value;
            $scope.scoreData.hole_score[index].chips = el[2].value;
            $scope.scoreData.hole_score[index].sand = el[3].value;
            $scope.scoreData.hole_score[index].water = el[4].value;
            $scope.scoreData.hole_score[index].ob = el[5].value;
            $scope.scoreData.hole_score[index].scoreSet = true;

            $scope.toggleHoleScoreVisibility(index+1,id);
        }

        $scope.setScorePlayer = function (index, id) {
            var holeScoreEl = document.getElementById(id);
            var el = (angular.element(holeScoreEl)).find("paper-slider")
            console.log(holeScoreEl, el)
            $scope.scoreData.hole_score[index].player = el[0].value;
            $scope.toggleHoleScoreVisibility(index+1,id);

        }
    }]);