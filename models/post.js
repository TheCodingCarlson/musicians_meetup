'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.post.belongsTo(models.user);
      }
    }
  });
  return post;
};