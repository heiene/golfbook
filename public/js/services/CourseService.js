angular.module('CourseService', []).factory('Course', ['$http', function($http) {

	return {
		// call to get all courses
		get : function() {
			return $http.get('/api/courses');
		},

		// call to POST and create a new course
		create : function(userData) {
			return $http.post('/api/courses', courseData);
		},

		// call to DELETE a course
		delete : function(id) {
			return $http.delete('/api/courses/' + id);
		}
	}
	
}]);