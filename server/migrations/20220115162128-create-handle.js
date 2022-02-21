"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("handles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      judge_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "online_judges",
          key: "id",
        },
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("handles")
  },
}
