var Golfcourse = require('../models/golfcourse');


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
	golfcourse.name 	= req.body.name;
	golfcourse.par 		= req.body.par;
	golfcourse.length 	= req.body.length;

	// Save the golfRound and check for errors
	golfcourse.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'golfcourse added!', data: golfcourse });
  });

}