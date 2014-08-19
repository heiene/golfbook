var Golfcourse = require('../models/course');


exports.getGolfCourses = function (req, res) {
	Golfcourse.find(function(err, golfcourses) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(golfcourses);
		}
	});
};

exports.postGolfCourse = function  (req, res) {
	var golfcourse = new Golfcourse();

	// Set the golfRound properties that came from the POST data
	golfcourse.name 	    = req.body.name;
	golfcourse.slope_value 	= req.body.slope_value;
	golfcourse.loops 	    = req.body.loops;

	// Save the golfRound and check for errors
	golfcourse.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'golfcourse added!', data: golfcourse });
  });

}