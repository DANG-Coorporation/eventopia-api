"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableName = "orders";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(tableName, "paymentMethodId");
    await queryInterface.addColumn(tableName, "paymentMethod", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn(tableName, "invoiceNo", {
      type: Sequelize.STRING,
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
    await queryInterface.addColumn(tableName, "paymentMethodId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.removeColumn(tableName, "paymentMethod");
    await queryInterface.removeColumn(tableName, "invoiceNo");
  },
};
