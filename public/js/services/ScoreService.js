/**
 * Created by oyvindheiene on 01/08/14.
 */
angular.module('ScoreServiceModule', [])

    .factory('ScoreService', ['CurrentUser', '$window','GolfCourses',  function (CurrentUser, $window, GolfCourses) {

        var factory = {};

        if ($window.sessionStorage.currentRound) {
            factory.currentRound = JSON.parse($window.sessionStorage.currentRound);
        } else {
            factory.currentRound = {};
        }

        if ($window.sessionStorage.tournamentRounds) {
            factory.tournamentRounds = JSON.parse($window.sessionStorage.tournamentRounds);
        } else {
            factory.tournamentRounds = [];
        }

        factory.sessionStoreCurrentRound = function() {
            $window.sessionStorage.currentRound = JSON.stringify(factory.currentRound);
        };

        factory.sessionDeleteCurrentRound = function() {
            $window.sessionStorage.removeItem("currentRound");
            factory.currentRound = {};

        };

        factory.addTournamentRound = function (round) {
            factory.tournamentRounds.push(round);
        };

        factory.deleteTournamentRound = function (index) {
            factory.tournamentRounds.splice(index,1);
        };

        factory.sessionStoreTournamentRounds = function() {
            $window.sessionStorage.tournamentRounds = JSON.stringify(factory.tournamentRounds);
        };

        factory.serverStoreTournamentRounds = function() {
            // Legge inn en POST mot server
        };

        factory.serverGetTournamentRounds = function() {
            // Legge inn en GET mot server
        };

        factory.serverGetTournamentRound = function(id) {
            // Legge inn en GET mot server
        };

        factory.serverDeleteTournamentRound = function(id) {
            // Legge inn en delete mot server
        };

        return factory;

    }]);