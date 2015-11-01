var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/classifieds')
	.get(function(req, res) {
		db.post.findAll({
			include: [db.user]
		}).then(function(posts) {
			res.render('classifieds', {posts: posts});
		});
	});

module.exports = router;