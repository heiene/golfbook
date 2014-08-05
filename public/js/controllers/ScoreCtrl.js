/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', '$timeout', 'GolfCourses', 'UserRoutes', 'ScoreService' ,function($scope, $http, $location, $timeout, GolfCourses, UserRoutes, ScoreService) {
        $scope.currentRound = ScoreService.currentRound;
//        $scope.scoreData = ScoreService.currentRound;
        console.log('location endring:',$scope.currentRound);
//        $scope.selectedCourse = ScoreService.selectedCourse;
        $scope.golfCourses = GolfCourses;

        $scope.prepareNewRound = function () {
            $location.path('/scorecard');
            $scope.currentRound.player1 = [];
            populateHoles();
//            $timeout(populateHoles, 1000)
            $timeout(function() {
                var test = document.getElementById("testslider-0")
                console.log("ideenene",test );
                console.log('ang',angular.element(test));
                (angular.element(test)).noUiSlider({
                        start: [ 20 ],
                        range: {
                            'min': 10,
                            'max': 40
                        }
                    });
            }, 3000)

        };

        var populateHoles = function () {


            //Setter opp et object for de andre spillerne
            $scope.currentRound.players = {
                player2: {
                    name: "Player2",
                    data: []
                },
                player3: {
                    name: "Øyvind",
                    data: []
                },
                player4: {
                    name: "Player4",
                    data: []
                }
            };
            for (i = 0; i< $scope.currentRound.selectedNumberOfHoles; i++) {
                var hole = {
                    score: {}
                };
                var p2 = {
                    score: {}
                };
                var p3 = {
                    score: {}
                };
                var p4 = {
                    score: {}
                };


                //Setter default verdier for hullene
                hole.score.number = $scope.currentRound.selectedCourse.holes[i].number;
                hole.score.strokes = $scope.currentRound.selectedCourse.holes[i].par;
                hole.score.puts = 2;
                hole.score.chips = 0;
                hole.score.sand = 0;
                hole.score.water = 0;
                hole.score.ob = 0;

                //Sørger for at hull-score settingen er collapsed
                hole.collapse = true;

                //Setter opp det samme for players
                p2.score.strokes = hole.score.strokes;
                p2.collapse = true;

                p3.score.strokes = hole.score.strokes;
                p3.collapse = true;

                p4.score.strokes = hole.score.strokes;
                p4.collapse = true;


                hole.strokeSliderOptions = {
                    "from": 1,
                    "to": (($scope.currentRound.selectedCourse.holes[i].par*2)+1),
                    "step": 1,
                    "smooth": false,
                    "value": $scope.currentRound.selectedCourse.holes[i].par
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
                };
                $scope.currentRound.player1.push(hole);
                $scope.currentRound.players.player2.data.push(p2);
                $scope.currentRound.players.player3.data.push(p3);
                $scope.currentRound.players.player4.data.push(p4);

            }
            console.log('REtt før location endring',$scope.currentRound)
            ScoreService.currentRound = $scope.currentRound;
//            ScoreService.selectedCourse = $scope.selectedCourse;
//            var scoreCard = document.getElementById("register-score");
//            (angular.element(scoreCard)).removeClass('right')


        };

        $scope.addRound = function () {
            $scope.currentRound.course_id = $scope.currentRound.selectedCourse._id
            UserRoutes.postScore($scope.currentRound)
                .success(function(data, status, headers, config) {
                    $scope.currentRound = null;
                    $scope.selectedCourse = null;
                    $scope.selectedNumberOfHoles = 0;

                })
                .error(function(data, status, headers, config) {
                    console.log('Error: ', data, 'Status: ', status);
                })
        };

        $scope.toggleHoleScoreVisibility = function(index) {
            $scope.currentRound.player1[index].collapse = !$scope.currentRound.player1[index].collapse;
        };

        $scope.calculateScoreHole = function (index) {
            console.log($scope.currentRound.player1[index].strokes);
            $scope.currentRound.player1[index].scoreSet = true;
            $scope.toggleHoleScoreVisibility(index);
        };

        $scope.calculateScorePlayer = function (index, player) {
            player.data[index].scoreSet = true;
            player.data[index].collapse = !player.data[index].collapse;

        };

        $scope.testStrokeModel1 = 4;


        $scope.testStrokeModel2 = 5;

//        $scope.setTheScore = function (databack) {
//            console.log('The model for score is now:', $scope.testStrokeModel)
//        }

//        var opts =  {
//            start: $scope.testStrokeModel,
//            range: {
//                'min': 1,
//                'max': 11
//            },
////            orientation: "vertical",
//            step: 1
////            snap: true
//        }
//
//        var temp = document.getElementById("testslider");
////        (angular.element(temp).noUiSlider(opts));


    }]);