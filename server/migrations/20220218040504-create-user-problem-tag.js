"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("user_problem_tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      problem_tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "problem_tags",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("user_problem_tags")
  },
}
