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

router.get('/classifieds/:query', function(req, res) {
	var query = req.params.search;
	db.user.find({
		where: {
			$like: query
		}
	}).then(function(filtered) {
		res.render('classifieds', {posts: filtered});
	});
});

module.exports = router;