angular.module('CourseCtrl', []).controller('CourseController', ['$scope', '$http', 'CourseRoutes', 'GolfCourses', '$window', function($scope, $http, CourseRoutes, GolfCourses, $window) {
	
	$scope.formData = {};
    $scope.courses = GolfCourses;

//    TODO: Wrap denne i en updateGolfcourse, og oppdater course i local storage
    $scope.refreshGolfCourse = function () {
        CourseRoutes.get()
            .success(function (data, status, headers, config) {
                $scope.courses = data;
                $window.localStorage.golfCourses = JSON.stringify(data);

            })
            .error(function (data, status, headers, config) {
                console.log('Error: ', data, 'Status: ', status);
            });
    }


    $scope.createGolfCourse = function () {
        CourseRoutes.create($scope.golfDataTest)
            .success(function(data, status, headers, config) {
                $scope.courses.push(data);
                GolfCourses.courses = $scope.courses;

            })
            .error(function(data, status, headers, config) {
                console.log('Error: ', data, 'Status: ', status);
            })

    }

	$scope.tagline = 'Controller for golfcourses';

    $scope.golfDataTest = {
        "name": "HimmerlandTest2",
        "slope_value": 356,
        "holes": [
            {   "number":   1,
                "par": 	    4,
                "index":    18,
                "length":     342,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   2,
                "par": 	    3,
                "index":    17,
                "length":     142,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   3,
                "par": 	    4,
                "index":    16,
                "length":     352,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   4,
                "par": 	    4,
                "index":    15,
                "length":     242,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   5,
                "par": 	    5,
                "index":    14,
                "length":     542,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   6,
                "par": 	    3,
                "index":    13,
                "length":     122,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   7,
                "par": 	    5,
                "index":    12,
                "length":     432,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   8,
                "par": 	    4,
                "index":    11,
                "length":     333,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   9,
                "par": 	    4,
                "index":    10,
                "length":     342,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   10,
                "par": 	    4,
                "index":    9,
                "length":     342,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   11,
                "par": 	    4,
                "index":    8,
                "length":     344,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   12,
                "par": 	    4,
                "index":    7,
                "length":     326,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   13,
                "par": 	    4,
                "index":    6,
                "length":     355,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   14,
                "par": 	    4,
                "index":    5,
                "length":     235,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   15,
                "par": 	    5,
                "index":    4,
                "length":     467,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   16,
                "par": 	    3,
                "index":    3,
                "length":     134,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   17,
                "par": 	    4,
                "index":    2,
                "length":     348,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            },
            {   "number":   18,
                "par": 	    4,
                "index":    1,
                "length":     388,
                "gps": {
                    "longitude": 123,
                    "latitude": 321}
            }
        ]
    }
}]);