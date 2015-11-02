var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var cloudinary = require('cloudinary');

app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/static/'));

var session = require('express-session');
app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
	if(req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			if(user) {
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
		req.currentUser = false;
		next();
	}
});

var flash = require('connect-flash');
app.use(flash());

app.use(function(req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});


app.get('/', function(req, res) {
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/sign_up', function(req, res) {
	res.render('sign_up');
});

app.get('/logout', function(req, res) {
	req.flash('success', 'You have successfully logged out!');
	req.session.user = false;
	res.redirect('/');
});

app.use('/', require('./controllers/auth'));
app.use('/', require('./controllers/community'));
app.use('/', require('./controllers/classifieds'));

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Rev up the engines! You are listening to port ' + port + '!');
});
