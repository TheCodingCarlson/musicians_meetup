# Musicians MeetUp
A place for all levels of musicians to meet and collaborate

### Basic Info/Approach

I wanted to create an app where all levels of musicians could connect. The site is split in into three main sections. A user profile, a community section, and a classifieds section. The community section is searchable and lists all users. The current user can contact other users via email by clicking the ‘Contact this Musician’ button located under each user. The classifieds section is where users can create posts. These are also searchable. A user can respond to these posts via e-mail by clicking the 'Reply' button. Edit and delete functionality exists for every user.  Users can also friend eachother and friends are displayed on each profile.

### Technologies Used
* Express/Node
* Sequelize
* Mailgun-js
* Cloudinary
* Multer
* jQuery
* CSS3
* Bcrypt
* Sessions

## Obstacles

Making sure that certain routes in my app were not accessible unless logged in. Accessing Cloudinary images from various routes. Keeping code DRY.

### Future Goals

Create chat functionality between two users using socket.io.
