var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var golfCourseSchema  = new Schema({
	name: 	String,
	par: 	Number,
	length: Number	
})

module.exports = mongoose.model('GolfCourse', golfCourseSchema);