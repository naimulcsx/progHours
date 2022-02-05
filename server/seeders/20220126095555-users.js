"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Naimul Haque",
          email: "naimulcsx@gmail.com",
          uid: "C181065",
          password:
            "$2b$10$SzHpcWVEVdkulvOTGrN/UOyt5yr6y7AXPak5VHn.g6tVfsBFMRn2K",
          role: "user",
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
    await queryInterface.bulkDelete("users", null, {})
  },
}
