/**
 * Connect to database
 */
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully")
  })
  .catch((error) => {
    console.log("Unable to connect to the database: ", error)
  })

/**
 * Register the models
 */
require("./User")(sequelize)
require("./Problem")(sequelize)
require("./Handle")(sequelize)
require("./OnlineJudge")(sequelize)
require("./Tag")(sequelize)
require("./ProblemTag")(sequelize)

sequelize.sync()

module.exports = sequelize.models
