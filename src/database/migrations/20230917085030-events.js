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
    queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      formatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coverUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      uniqueId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      eventStartDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eventEndDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isTermsAndConditions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      termAndCondition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isFullName: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isPhoneNumber: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isIdentityNumber: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isDob: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isGender: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      maxPerbuy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 5,
      },
      isOneEmailOneTransaction: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isOneTicketOneData: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.dropTable(tableName);
  },
};
