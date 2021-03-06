'use strict';
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('Annotation', {
    label: DataTypes.STRING,
    numeric_value: DataTypes.INTEGER,
    string_value: DataTypes.STRING,
    units: DataTypes.STRING,
    imageId: DataTypes.INTEGER
  }, {
    indexes: [
      {
          unique: true,
          fields: ['label', 'string_value']
      },
      {
        unique: true,
        fields: ['label', 'numeric_value']
      }
    ]
  });
  Annotation.associate = function(models) {
    // associations can be defined here
    Annotation.belongsTo(models.Image);
  };
  return Annotation;
};