'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Batteries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      batteryName: {
        type: Sequelize.STRING
      },
      previousLocation: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.STRING
      },
      energyUsed: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      swapStationId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Batteries');
  }
};