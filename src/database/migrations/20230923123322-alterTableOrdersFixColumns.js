"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableName = "events";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(tableName, "city");
    await queryInterface.addColumn(tableName, "cityId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn(tableName, "provinceId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn(tableName, "city", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn(tableName, "cityId");
    await queryInterface.removeColumn(tableName, "provinceId");
  },
};
