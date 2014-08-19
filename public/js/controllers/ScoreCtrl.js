/**
 * Created by oyvindheiene on 05/07/14.
 */
angular.module('ScoreCtrl', [])
    .controller('ScoreController', ['$scope', '$http', '$location', '$timeout', 'GolfCourses', 'UserRoutes', 'ScoreService' ,function($scope, $http, $location, $timeout, GolfCourses, UserRoutes, ScoreService) {
        $scope.currentRound = ScoreService.currentRound;
        console.log('location endring:',$scope.currentRound);
        $scope.golfCourses = GolfCourses;

        //Setter opp et object for de andre spillerne
        if(!$scope.currentRound.players) {
            $scope.currentRound.players = {
                player2: {
                    name: "",
                    data: []
                },
                player3: {
                    name: "",
                    data: []
                },
                player4: {
                    name: "",
                    data: []
                }
            };
        }


        $scope.prepareNewRound = function () {
            $location.path('/scorecard');
            $scope.currentRound.player1 = [];
//            populateHoles();
            $timeout(populateHoles, 1000)

        };

        var populateHoles = function () {

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
                hole.score.number = $scope.currentRound.selectedCourse.loops[0].holes[i].number;
                hole.score.strokes = $scope.currentRound.selectedCourse.loops[0].holes[i].par;
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

                $scope.currentRound.player1.push(hole);
                $scope.currentRound.players.player2.data.push(p2);
                $scope.currentRound.players.player3.data.push(p3);
                $scope.currentRound.players.player4.data.push(p4);

            }

            // Lagrer currentRound i sessionstorage
            ScoreService.sessionStoreCurrentRound();

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

        $scope.resetCurrentRound = function () {
            ScoreService.sessionDeleteCurrentRound();
        }

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

        $scope.$watch(function () {
                return $scope.currentRound.numberOfPlayers;
            },
            function(newVal, oldVal) {
               console.log(newVal);
                calcVisibility(newVal);
            }, true);

var calcVisibility = function (newVal) {

        if (newVal === 1) {
            $scope.currentRound.players.player2.visible = false;
            $scope.currentRound.players.player3.visible = false;
            $scope.currentRound.players.player4.visible = false;
        } else if (newVal === 2) {
            $scope.currentRound.players.player2.visible = true;
            $scope.currentRound.players.player3.visible = false;
            $scope.currentRound.players.player4.visible = false;
        } else if (newVal === 3) {
            $scope.currentRound.players.player2.visible = true;
            $scope.currentRound.players.player3.visible = true;
            $scope.currentRound.players.player4.visible = false;
        } else if (newVal === 4) {
            console.log("kjem eg hit")
            $scope.currentRound.players.player2.visible = true;
            $scope.currentRound.players.player3.visible = true;
            $scope.currentRound.players.player4.visible = true;
        }
}

        $scope.test = {
            stroke: 5,
            put: 0,
            chip: 0,
            sand: 0,
            water: 0,
            ob: 0,
            player: 4
        };


        $scope.testStrokeModel2 = 5;

    }]);