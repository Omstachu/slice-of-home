'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  Trip.associate = function(models) {
    // associations can be defined
    Trip.belongsTo(models.Spot, {foreignKey: "spotId"})
    Trip.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Trip;
};
