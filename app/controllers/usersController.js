var User = require('../models/user');

exports.getUsers = function (req, res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.getUser = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(user);
			
		}
	})
};

//alt her blir håndtert av passport, dette er kun for å sende user i callback for Post Request
exports.postUser = function (req, res) {
	res.json({message: 'signup successfull', user: req.user})
};

//Svakhet her at man kan endre username i ettertid til å være likt et annet
//Enten kan man legge inn en sjekk her, eller så legger man no sånn 
//"unik" parameter på mongodb - usermodellen. litt usikker
exports.putUser = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.send(err);
		}
		else {
			user.username = req.body.username;
			user.password = req.body.password;

			user.save(function (err) {
				if (err) {
					res.send(err);
				}
				else {
					res.json({ message: 'User updated!' , data: user});
				}
			});
		};
	});
};

exports.deleteUser = function (req, res) {
	User.remove( {
		_id: req.params.user_id}, function (err, user) {
			if (err) {
				res.send(err);
			}
			else {
				res.json({ message: 'User deleted!', data: user });
			}
		});
};
