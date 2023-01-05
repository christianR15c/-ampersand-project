'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    [
      {
        id: 1,
        name: "chris",
        email: "chris@gmail.com",
        password: bcrypt.hashSync('123456', Number.parseInt(process.env.adminSecretKey)),
        phone: "0782400445",
        nationalId: "123456789",
        isAdmin: true
      }
    ]
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
