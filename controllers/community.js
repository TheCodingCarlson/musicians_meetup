var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/community')
	.get(function(req, res) {
		db.user.findAll().then(function(users) {
		res.render('community', {users: users});
		});
	});

module.exports = router;