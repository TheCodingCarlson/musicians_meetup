var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/')
	.get(function(req, res) {
		res.render('index');
	}).post(function(req, res) {
		db.user.authenticate(
			req.body.email,
			req.body.password,
			function(err, user) {
				if(err) {
					res.send(err);
				} else if(user) {
					req.session.user = user.id;
					res.redirect('/user_profile');
				} else {
					req.flash('danger', 'Invalid email or password, please try again!');
					res.redirect('/');
				}
			}
		);
	});

module.exports = router;