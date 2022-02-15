"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      "onlineJudges",
      [
        {
          id: 1,
          name: "Codeforces",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "SPOJ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "CodeChef",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "AtCoder",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "HackerRank",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: "LightOJ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: "UVA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: "CSES",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("onlineJudges", null, {})
  },
}
