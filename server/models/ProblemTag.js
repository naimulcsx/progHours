const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     problemTag:
 *       type: object
 *       required:
 *         - problemId
 *         - tagId
 *       properties:
 *         id:
 *           type: integer
 *         problemId:
 *           type: integer
 *         tagId:
 *           type: integer
 */

module.exports = (sequelize) => {
  const ProblemTag = sequelize.define(
    "ProblemTag",
    {
      problemId: {
        type: DataTypes.INTEGER,
        references: "problems",
        referencesKey: "id",
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: "tags",
        referencesKey: "id",
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return ProblemTag
}
