angular.module('CourseService', [])
    .factory('CourseRoutes', ['$http', 'CurrentUser', function($http, CurrentUser) {
        $http.defaults.headers.common['Authorization'] = CurrentUser.basicString || '';

        return {
            // call to get all courses
            get : function() {
                return $http.get('/api/courses');
            },

            // call to POST and create a new course
            create : function(courseData) {
                return $http.post('/api/courses', courseData);
            },

            // call to DELETE a course
            remove : function(id) {
                return $http.delete('/api/courses/' + id);
            }
        }
	}])

    .factory('GolfCourses', [function() {
        return {
            courses: Object,
            holes:  Number
        };
    }]);