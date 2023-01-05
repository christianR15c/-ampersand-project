'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Battery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Battery.belongsTo(models.SwapStation, {
        foreignKey: 'swapStationId',
        as: 'swapStations'
      })
    }
  }
  Battery.init({
    batteryName: DataTypes.STRING,
    previousLocation: DataTypes.STRING,
    location: DataTypes.STRING,
    distance: DataTypes.STRING,
    energyUsed: DataTypes.STRING,
    price: DataTypes.FLOAT,
    swapStationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Battery',
  });
  return Battery;
};