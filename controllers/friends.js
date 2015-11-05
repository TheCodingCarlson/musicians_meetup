var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/user_profile') 
	.post(function(req, res) {
		var id = req.body.friends_id;
		db.user.find({
			where: {
				id: id 
			}
		}).then(function(user) {
			db.user.find({
				where: {
					id: req.currentUser.id
				}
			}).then(function(userTwo) {
				user.addFriend(userTwo);
				userTwo.addFriend(user);
				res.redirect('/community');
			});
		});
	});

module.exports = router;