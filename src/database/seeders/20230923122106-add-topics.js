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
      "topics",
      [
        {
          id: 15,
          name: "  Musik",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 1,
          name: "  Bisnis",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 2,
          name: "  Desain Foto Video",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 3,
          name: "  Fashion Kecantikan",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 4,
          name: "  Film Sinema",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 5,
          name: "  Game E-Sports",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 6,
          name: "  Hobi Kerajinan Tangan",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 7,
          name: "  Investasi Saham",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 8,
          name: "  Karir Pengembangan Diri",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 9,
          name: "  Keagamaan",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 10,
          name: "  Kesehatan Kebugaran",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 11,
          name: "  Keuangan Finansial",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 12,
          name: "  Lingkungan Hidup",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 13,
          name: "  Makanan Minuman",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 14,
          name: "  Marketing",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 16,
          name: "  Olahraga",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 17,
          name: "  Otomotif",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 18,
          name: "  Sains Teknologi",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 19,
          name: "  Seni Budaya",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 20,
          name: "  Sosial Hukum Politik",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 21,
          name: "  Standup Comedy",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 22,
          name: "  Pendidikan Beasiswa",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 23,
          name: "  Tech Start-Up",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 24,
          name: "  Wisata & Liburan",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
        },
        {
          id: 25,
          name: "  Lainnya",
          createdAt: "2023-09-23 19:19:27",
          updatedAt: "2023-09-23 19:19:27",
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
    await queryInterface.bulkDelete("topics", null, {});
  },
};
