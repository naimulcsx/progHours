// const sequelize = require("sequelize")
const { DataTypes } = require("sequelize")

const { User, OnlineJudge } = require("./index").models

/**
 * @swagger
 * components:
 *   schemas:
 *     handle:
 *       type: object
 *       required:
 *         - value
 *         - userId
 *         - judgeId
 *       properties:
 *         value:
 *           type: string
 *         userId:
 *           type: integer
 *         judgeId:
 *           type: integer
 */

module.exports = (sequelize) => {
  const Handle = sequelize.define(
    "Handle",
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      judgeId: {
        type: DataTypes.INTEGER,
        references: {
          model: OnlineJudge,
          key: "id",
        },
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return Handle
}
