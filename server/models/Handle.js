const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     problem:
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
        allowNull: false,
      },
      judgeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return Handle
}
