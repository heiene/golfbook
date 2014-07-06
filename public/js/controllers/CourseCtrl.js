angular.module('CourseCtrl', []).controller('CourseController', ['$scope', '$http', 'CourseRoutes', 'GolfCourses', function($scope, $http, CourseRoutes, GolfCourses) {
	
	$scope.formData = {};

    $scope.getGolfCourses = function () {
        CourseRoutes.get()
            .success(function(data) {
                GolfCourses.courses = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.courses = GolfCourses.courses;
	$scope.tagline = 'Controller for golfcourses';	

}]);