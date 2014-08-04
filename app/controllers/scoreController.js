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

exports.getScoresUser = function (req, res) {
    Score.find({ user_id: req.params.user_id}, function (err, scores) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(scores)
            res.json(scores);

        }
    })
};


exports.postScore = function(req, res) {
  // Create a new instance of the Score model
  var score = new Score();

var tempArray = [];
    for (i in req.body.player1) {
        tempArray.push(req.body.player1[i].score);
    }

  // Set the Score properties that came from the POST data
  score.hole_score = tempArray;
  score.user_id = req.user._id;
  score.course_id = req.body.course_id;

  // Save the score and check for errors
  score.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'score added to the User!', data: {User: req.user, Score: score} });
  });
};