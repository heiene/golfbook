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

// Må ha denne, basic auth sender bare tilbake en htmlside av no slag...
// req.user blir oppdatert inne i passport strategien slik at passordet strippes av objectet før det sendes tilbake.

exports.login = function (req, res) {
    res.json({user: req.user});
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

//Kun admin som får lov til å poste users
exports.postUser = function (req, res) {
    var newUser	= new User();
    console.log('hva blir sendt med inn', req.body)
    // set the user's basic credentials
    newUser.username    = req.body.username;
    newUser.password 	= newUser.generateHash(req.body.password);
    newUser.isAdmin     = req.body.isAdmin;

    // save the user
    newUser.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
	res.json({message: 'signup successfull', user: newUser})
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
			// user.password = req.body.password;

			user.save(function (err) {
				if (err) {
					res.send(err);
				}
				else {
					res.json({ message: 'User updated!' , data: user});
				}
			});
		}
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
