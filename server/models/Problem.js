const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     problem:
 *       type: object
 *       required:
 *         - pid
 *         - name
 *         - judgeId
 *       properties:
 *         id:
 *           type: integer
 *         pid:
 *           type: string
 *         name:
 *           type: string
 *         judgeId:
 *           type: integer
 */

module.exports = (sequelize) => {
  const Problem = sequelize.define(
    "Problem",
    {
      pid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Problem already exists",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
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

  return Problem
}
