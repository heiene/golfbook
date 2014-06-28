var Golfround = require('../models/golfround');


exports.getGolfrounds = function (req, res) {
	Golfround.find(function(err, golfrounds) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(golfrounds);
		}
	});
};


exports.postGolfround = function(req, res) {
  // Create a new instance of the GolfRound model
  var golfround = new Golfround();

  // Set the golfRound properties that came from the POST data
  golfround.score = req.body.score;
  golfround.user_id = req.user._id

  // Save the golfRound and check for errors
  golfround.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'golfround added to the User!', data: {User: req.user, Golfround: golfround} });
  });
};