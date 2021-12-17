const { DataTypes } = require("sequelize")

/**
 * @swagger
 * components:
 *   schemas:
 *     problem:
 *       type: object
 *       required:
 *         - name
 *         - parentId
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         parentId:
 *           type: integer
 */

module.exports = (sequelize) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )

  return Tag
}
