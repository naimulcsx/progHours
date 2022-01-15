const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     practiceSubmission:
 *       type: object
 *       required:
 *         - userId
 *         - problemId
 *         - verdict
 *         - solvedAt
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         problemId:
 *           type: integer
 *         verdict:
 *           type: integer
 *         solvedAt:
 *           type: integer
 */

module.exports = (sequelize) => {
  const PracticeSubmission = sequelize.define(
    "PracticeSubmission",
    {
      problemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Problem",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      verdict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solvedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return PracticeSubmission
}
