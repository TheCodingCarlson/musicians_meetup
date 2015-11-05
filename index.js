var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var cloudinary = require('cloudinary');

cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
	res.locals.url = cloudinary.url;
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

app.get('/user_profile', function(req, res) {
	var id = req.currentUser.id;
	res.redirect("/user_profile/"+id);
});

app.get('/user_profile/:id', function(req, res) {
	var id = req.params.id;
	db.user.findById(id).then(function(user) {
		var imgUrl = cloudinary.url(user.img, { width: 600, height: 400, crop: "thumb" });
		user.getFriend().then(function(friend) {
			var data = {
				user: user, 
				friends:friend,
				userImg: imgUrl
			};
			res.render('user_profile', data);
		});
		
	});
});

app.delete('/user_profile/:id',function(req, res) {
	var id = req.params.id;
	db.user.find({
		where: {
			id: id
		}
	}).then(function(user) {
		user.destroy({force: true}).then(function() {
			res.send('destroyed!')
		});
	});
});

app.use('/', require('./controllers/auth'));
app.use('/', require('./controllers/community'));
app.use('/', require('./controllers/classifieds'));
app.use('/', require('./controllers/signUp'));
app.use('/', require('./controllers/createPost'));
app.use('/', require('./controllers/createProfile'));
app.use('/', require('./controllers/editProfile'));
app.use('/', require('./controllers/messages'));
app.use('/', require('./controllers/friends'));

var port = process.env.PORT || 3000;

app.listen(port);