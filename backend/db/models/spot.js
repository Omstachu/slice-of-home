'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    cityId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    },

    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: DataTypes.TEXT
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, {foreignKey: 'userId'})
    Spot.belongsTo(models.City, {foreignKey: 'cityId'})
    Spot.hasMany(models.Image, {foreignKey: 'spotId'})
    Spot.hasMany(models.Trip, {foreignKey: 'spotId'})
  };
  return Spot;
};
