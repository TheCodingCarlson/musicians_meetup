var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/community')
	.get(function(req, res) {
		var query = req.query.search;
		if(query) {
			db.user.findAll({
				where: {
					$or: [ 
					{firstName: {$iLike: '%'+query+'%'}},
					{lastName: {$iLike: '%'+query+'%'}},
					{location: {$iLike: '%'+query+'%'}},
					{genres: {$iLike: '%'+query+'%'}},
					{instruments: {$iLike: '%'+query+'%'}}]
				}	
			}).then(function(filtered) {
				res.render('community', {users: filtered});
			});

		} else {
			db.user.findAll().then(function(users) {
				res.render('community', {users: users});
			});
		}
	});

module.exports = router;