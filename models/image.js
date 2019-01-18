'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.STRING,
    filename: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User);
    Image.hasMany(models.Annotation);
  };
  return Image;
};