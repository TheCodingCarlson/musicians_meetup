var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/static/'));

app.get('/', function(req, res) {
	res.send('Hi there');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Rev up the engines! You are listening to port ' + port + '!');
});
