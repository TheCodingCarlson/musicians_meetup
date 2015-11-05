var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var multer = require('multer');
var uploads = multer({ dest: './uploads'});
var cloudinary = require('cloudinary');





module.exports = router;