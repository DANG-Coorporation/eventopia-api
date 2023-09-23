"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("provinces", [
      {
        id: 52,
        name: "NUSA TENGGARA BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 11,
        name: "ACEH",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 12,
        name: "SUMATERA UTARA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 13,
        name: "SUMATERA BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 14,
        name: "RIAU",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 15,
        name: "JAMBI",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 16,
        name: "SUMATERA SELATAN",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 17,
        name: "BENGKULU",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 18,
        name: "LAMPUNG",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 19,
        name: "KEPULAUAN BANGKA BELITUNG",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 21,
        name: "KEPULAUAN RIAU",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 31,
        name: "DKI JAKARTA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 32,
        name: "JAWA BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 33,
        name: "JAWA TENGAH",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 34,
        name: "DI YOGYAKARTA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 35,
        name: "JAWA TIMUR",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 36,
        name: "BANTEN",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 51,
        name: "BALI",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 53,
        name: "NUSA TENGGARA TIMUR",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 61,
        name: "KALIMANTAN BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 62,
        name: "KALIMANTAN TENGAH",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 63,
        name: "KALIMANTAN SELATAN",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 64,
        name: "KALIMANTAN TIMUR",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 65,
        name: "KALIMANTAN UTARA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 71,
        name: "SULAWESI UTARA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 72,
        name: "SULAWESI TENGAH",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 73,
        name: "SULAWESI SELATAN",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 74,
        name: "SULAWESI TENGGARA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 75,
        name: "GORONTALO",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 76,
        name: "SULAWESI BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 81,
        name: "MALUKU",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 82,
        name: "MALUKU UTARA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 91,
        name: "PAPUA BARAT",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
      {
        id: 94,
        name: "PAPUA",
        createdAt: "2023-09-23 19:13:13",
        updatedAt: "2023-09-23 19:13:13",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("provinces", null, {});
  },
};
