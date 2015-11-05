'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email:  {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
      }
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    instruments: DataTypes.STRING,
    location: DataTypes.STRING,
    genres: DataTypes.TEXT,
    img: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    lookingFor: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.post, {onDelete: 'cascade', hooks: true});
        models.user.belongsToMany(models.user, {as : 'friend', through: 'usersFriends'});
      },
      authenticate: function(email, password, callback) {
        this.find({ where: { email: email }}).then(function(user) {
          if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
              if(err) {
                callback(err, false);
              } else {
                callback(null, result ? user: false);
              }
            });
          } else {
            callback(null, false);
          }
        });
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if(user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if(err) {
              return callback(err);
            } else {
              user.password = hash;
              callback(null, user);
            }
          });
        }
      }
    }
  });
  return user;
};