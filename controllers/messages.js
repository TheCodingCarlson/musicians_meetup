var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

var api_key = process.env.MAIL_GUN_API_KEY;
var domain = 'sandboxb0c6502edc704f1bb54491ee66974f00.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.route('/send_message/:id')
	.get(function(req, res) {
		var id = req.params.id;
		db.post.find({
			where: {
				id: id
				},
				include: [db.user]
			}).then(function(post) {
			res.render('send_message', {post: post});
	});
	}).post(function(req, res) {
		var message = req.body.messageBody;
		var id = req.params.id;
		var user = req.session.user;
			db.post.find({
				where: {
					id: id
				},
				include: [db.user]
			}).then(function(post) {
				var data = {
				  from: req.currentUser.email,
				  to: post.user.email,
				  subject: 'Re: ' + post.title,
				  text: message
				}

				mailgun.messages().send(data, function (error, body) {
  					console.log(data);
				});

				res.redirect('/classifieds');
			});
	});




module.exports = router;