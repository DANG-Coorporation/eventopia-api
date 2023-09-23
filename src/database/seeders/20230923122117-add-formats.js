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
    await queryInterface.bulkInsert(
      "formats",
      [
        {
          id: 9,
          name: "  Akomodasi",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 1,
          name: "  Festival Fair Bazaar",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 2,
          name: "  Konser",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 3,
          name: "  Pertandingan",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 4,
          name: "  Exhibition Expo Pameran",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 5,
          name: "  Konferensi",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 6,
          name: "  Workshop",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 7,
          name: "  Pertunjukan",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 8,
          name: "  Atraksi Theme Park",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 10,
          name: "  Seminar Talk Show",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 11,
          name: "  Social Gathering",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 12,
          name: "  Training Sertifikasi Ujian",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 13,
          name: "  Pensi Event Sekolah Kampus",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 14,
          name: "  Trip Tur",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 15,
          name: "  Turnamen Kompetisi",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
        {
          id: 16,
          name: "  Lainnya",
          createdAt: "2023-09-23 19:18:37",
          updatedAt: "2023-09-23 19:18:37",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("formats", null, {});
  },
};
