var Score   = require('../models/score');

exports.getScores = function (req, res) {
	Score.find(function(err, scores) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(scores);
		}
	});
};


exports.postScore = function(req, res) {
  // Create a new instance of the Score model
  var score = new Score();

  // Set the Score properties that came from the POST data
  score.hole_score = req.body.hole_score;
  score.user_id = req.user._id;
  score.course_id = req.body.course_id;

  // Save the score and check for errors
  score.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'score added to the User!', data: {User: req.user, Score: score} });
  });
};