const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     onlineJudge:
 *       type: object
 *       required:
 *         - name
 *         - urlRegex
 *       properties:
 *         name:
 *           type: string
 *         urlRegex:
 *           type: integer
 */

module.exports = (sequelize) => {
  const OnlineJudge = sequelize.define(
    "OnlineJudge",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return OnlineJudge
}
