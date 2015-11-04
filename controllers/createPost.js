var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/create_post', function(req, res) {
	if(req.currentUser) {
		res.render('create_post');
	} else { 
		res.redirect('/');
	}
});

router.post('/create_post', function(req, res) {
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