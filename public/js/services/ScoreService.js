/**
 * Created by oyvindheiene on 01/08/14.
 */
angular.module('ScoreService', [])

    .factory('CurrentScoreRound', ['CurrentUser', '$window','GolfCourses',  function (CurrentUser, $window, GolfCourses) {

        var factory = {};
        factory.currentRound = {};
        factory.selectedCourse = {};


        factory.setUpScoreCard = function (data) {

            populateHoles(data.selectedNumberOfHoles);

        };

        return factory;

    }]);