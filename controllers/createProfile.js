var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var multer = require('multer');
var upload = multer({ dest: './uploads/'});
var cloudinary = require('cloudinary');

cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
		var image = req.body.something;

		db.user.find({
			where: {
				email: req.currentUser.email
			}
	}).then(function(user) {
		user.updateAttributes({
			firstName: firstName,
			lastName: lastName,
			instruments: instruments,
			location: location,
			img: image,
			genres: genres,
			bio: bio,
			lookingFor: lookingFor
			})
			.then(function() {
					req.session.user = user.id;
					console.log(user.img);
					res.redirect("/user_profile");
			});
		});
});
	
module.exports = router;