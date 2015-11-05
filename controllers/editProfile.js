var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var multer = require('multer');
var uploads = multer({ dest: './uploads'});
var cloudinary = require('cloudinary');

cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/edit_profile', function(req, res) {
	if(req.currentUser) {
		var id = req.currentUser.id;
		db.user.findById(id).then(function(user) {
		res.render('edit_profile', {user: user});
	});
	} else {
		res.redirect('/');
	}
});
	
router.post('/edit_profile', uploads.single('image'),function(req, res) {
	if(req.file) {
		cloudinary.uploader.upload(req.file.path, function(result) {
		var image = result.public_id;
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var instruments = req.body.instruments;
		var location = req.body.location;
		var genres = req.body.genres;
		var bio = req.body.bio;
		var lookingFor = req.body.lookingFor;

		db.user.find({
			where: {
				email: req.currentUser.email
			}
		}).then(function(user) {
			user.updateAttributes({
					firstName: firstName,
					lastName: lastName,
					img: image,
					instruments: instruments,
					location: location,
					genres: genres,
					bio: bio,
					lookingFor: lookingFor
				})
				.then(function(user) {
					user.save();
					req.session.user = user.id;
					res.redirect("/user_profile");
				});
			});
		});
	} else {
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var instruments = req.body.instruments;
		var location = req.body.location;
		var genres = req.body.genres;
		var bio = req.body.bio;
		var lookingFor = req.body.lookingFor;

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
					genres: genres,
					bio: bio,
					lookingFor: lookingFor
				})
				.then(function(user) {
					user.save();
					req.session.user = user.id;
					res.redirect("/user_profile");
				});
		});

	}
});
	
module.exports = router;