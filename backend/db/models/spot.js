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
        len: [1, 100]
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
    Spot.belongsTo(models.Users, {foreignKey: 'userId'})
    Spot.belongsTo(models.Cities, {foreignKey: 'cityId'})
    Spot.hasMany(models.Images, {foreignKey: 'spotId'})
  };
  return Spot;
};
