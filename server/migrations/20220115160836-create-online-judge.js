"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("online_judges", {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique: true,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("online_judges")
  },
}
