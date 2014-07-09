angular.module('CourseCtrl', []).controller('CourseController', ['$scope', '$http', 'CourseRoutes', 'GolfCourses', function($scope, $http, CourseRoutes, GolfCourses) {
	
	$scope.formData = {};

    CourseRoutes.get()
        .success(function(data, status, headers, config) {
            $scope.courses = data;
            GolfCourses.courses = data;

        })
        .error(function(data, status, headers, config) {
            console.log('Error: ', data, 'Status: ', status);
    });

	$scope.tagline = 'Controller for golfcourses';

}]);