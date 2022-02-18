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
        },
        {
          id: 2,
          name: "SPOJ",
        },
        {
          id: 3,
          name: "CodeChef",
        },
        {
          id: 4,
          name: "AtCoder",
        },
        {
          id: 5,
          name: "HackerRank",
        },
        {
          id: 6,
          name: "LightOJ",
        },
        {
          id: 7,
          name: "UVA",
        },
        {
          id: 8,
          name: "CSES",
        },
        {
          id: 9,
          name: "Toph",
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
