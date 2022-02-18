"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      "online_judges",
      [
        {
          id: 1,
          name: "Codeforces",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "SPOJ",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "CodeChef",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "AtCoder",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "HackerRank",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: "LightOJ",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: "UVA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: "CSES",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: "Toph",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("online_judges", null, {})
  },
}
