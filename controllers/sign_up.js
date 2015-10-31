var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.route('/sign_up')
	.get(function(req, res) {
		res.render('sign_up');
	});

module.exports = router;

