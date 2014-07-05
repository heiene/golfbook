var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var Hole 		= require('./hole');

var golfCourseSchema  = new Schema({
	name: 		String,
	slopevalue: Number,
	holes:  [{	
		number: Number,
		par: 	Number,
		index: 	Number,
		length: Number,
		gps: { 	longitude: 	Number,
				latitude: 	Number}}]
})

golfCourseSchema.methods.calculateLength = function (holes) {
	var lenght;
	holes.forEach(function(hole) {
		length += hole.lenght;
	})

	return length;
};

module.exports = mongoose.model('GolfCourse', golfCourseSchema);