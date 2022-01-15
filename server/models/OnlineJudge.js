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
  const Handle = sequelize.define(
    "Handle",
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

  return Handle
}
