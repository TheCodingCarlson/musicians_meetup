var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/create_post')
	.get(function(req, res) {
		res.render('create_post');
	})
	.post(function(req, res) {
		var id = req.session.user;
		var title = req.body.title;
		var body = req.body.body;

		if(title && body) {
			db.user.findById(id).then(function(user) {
				user.createPost({
					title: title,
					body: body
				}).then(function(post) {
					res.redirect('/classifieds');
				});
			});
		} else {
			res.redirect('/create_post');
		}
	});

module.exports = router;