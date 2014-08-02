/**
 * Created by oyvindheiene on 01/08/14.
 */
angular.module('ScoreServiceModule', [])

    .factory('ScoreService', ['CurrentUser', '$window','GolfCourses',  function (CurrentUser, $window, GolfCourses) {

        var factory = {};
        factory.currentRound = {};
        factory.rounds = {};
        factory.selectedCourse = {};


        return factory;

    }]);