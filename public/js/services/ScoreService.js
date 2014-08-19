/**
 * Created by oyvindheiene on 01/08/14.
 */
angular.module('ScoreServiceModule', [])

    .factory('ScoreService', ['CurrentUser', '$window','GolfCourses',  function (CurrentUser, $window, GolfCourses) {

        var factory = {};
        factory.currentRound = {};
        factory.rounds = {};
        factory.selectedCourse = {};

        factory.setCurrentRound = function() {
            $window.sessionStorage.currentRound = JSON.stringify(factory.currentRound);
        }

        if ($window.sessionStorage.currentRound) {
            factory.currentRound = JSON.parse($window.sessionStorage.currentRound);
        }


        return factory;

    }]);