const { DataTypes } = require("sequelize")

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
        references: "users",
        referencesKey: "id",
      },
      judgeId: {
        type: DataTypes.INTEGER,
        references: "online_judges",
        referencesKey: "id",
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return Handle
}
