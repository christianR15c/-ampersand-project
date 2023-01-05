'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapStation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SwapStation.hasMany(models.Battery, {
        foreignKey: 'swapStationId',
        as: 'stations'
      })
    }
  }
  SwapStation.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SwapStation',
  });
  return SwapStation;
};