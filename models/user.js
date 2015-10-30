'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
        models.user.belongsToMany(models.user, {as : 'friend', through: 'friend'});
      }
    }
  });
  return user;
};