var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var golfCourseSchema  = new Schema({
	name: 		String,
	slope_value: Number,
	holes:  [{	
		number: Number,
		par: 	Number,
		index: 	Number,
		length: Number,
		gps: { 	longitude: 	Number,
				latitude: 	Number}}]
})

golfCourseSchema.methods.calculateLength = function (holes) {
	var length;
	holes.forEach(function(hole) {
		length += hole.lenght;
	})

	return length;
};

module.exports = mongoose.model('GolfCourse', golfCourseSchema);