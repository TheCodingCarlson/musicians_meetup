var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/sign_up')
	.post(function(req, res) {
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var password = req.body.password;
		var password2 = req.body.password2;

		req.session.email = email;

		if (password !== password2) {
			req.flash('error', 'Passwords must match!');
			res.redirect('/sign_up');
		} else {
			db.user.findOrCreate({
				where: {
					email: email
				},
				defaults: {
					email: email,
					password: password,
				}
			}).spread(function(user, created) {
				if(created) {
					req.flash('success', 'You are succesfully signed up');
					req.session.user = user.get().id
					console.log(req.session.user);
					res.redirect('/create_profile');
				} else {
					req.flash('error', 'A user with that email already exists');
					res.redirect('/sign_up');
				}
			}).catch(function(err) {
				req.flash('error', 'Sorry, an error occurred ' + err.message);
				res.redirect('/sign_up');
			});
		}
	});

module.exports = router;