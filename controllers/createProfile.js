var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/create_profile')
	.get(function(req, res) {
		res.render('create_profile');
	})
	.post(function(req, res) {
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var instruments = req.body.instruments;
		var location = req.body.location;
		var genres = req.body.genres;
		var bio = req.body.bio;
		var lookingFor = req.body.lookingFor;

		db.user.find({
			where: {
				email: req.session.email
			}
		}).then(function(user) {
			user.updateAttributes({
				firstName: firstName,
				lastName: lastName,
				instruments: instruments,
				location: location,
				genres: genres,
				bio: bio,
				lookingFor: lookingFor
			}).then(function() {
				res.render('user_profile', {user: user});
			});
		});
	});
		
module.exports = router;