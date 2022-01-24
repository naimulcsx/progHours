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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("online_judges")
  },
}
