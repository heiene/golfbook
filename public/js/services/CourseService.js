angular.module('CourseService', [])
    .factory('CourseRoutes', ['$http', function($http) {

        return {
            // call to get all courses
            get : function() {
                return $http.get('/api/golfcourses');
            },

            // call to POST and create a new course
            create : function(userData) {
                return $http.post('/api/golfcourses', courseData);
            },

            // call to DELETE a course
            delete : function(id) {
                return $http.delete('/api/golfcourses/' + id);
            }
        }
	}])

    .factory('GolfCourses', [function() {
        return {
            courses: Object,
            holes:  Number
        };
    }]);