var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/classifieds')
	.get(function(req, res) {
		if(req.currentUser) {
			var query = req.query.search;
			if(query) {
				db.post.findAll({
					where: {
						$or: [
						{title: {$iLike: '%'+query+'%'}},
						{body: {$iLike: '%'+query+'%'}}]
					},
					include: [db.user]
				}).then(function(filtered) {
					res.render('classifieds', {posts: filtered});
				});

			} else {
				db.post.findAll({
					include: [db.user]
				}).then(function(posts) {
					res.render('classifieds', {posts: posts});
				});
			}
		} else {
			res.redirect('/');
		}
	});

module.exports = router;