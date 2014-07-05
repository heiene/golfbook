angular.module('CourseCtrl', []).controller('CourseController', ['$scope', '$http', function($scope, $http) {
	
	$scope.formData = {};
	
	$http.get('/api/courses')
                .success(function(data) {
                        $scope.courses = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
	$scope.tagline = 'Controller for golfcourses';	

}]);