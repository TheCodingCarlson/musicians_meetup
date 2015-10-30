'use strict';
module.exports = function(sequelize, DataTypes) {
  var friend = sequelize.define('friend', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return friend;
};