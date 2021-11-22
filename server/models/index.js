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
sequelize.sync({ force: true })
module.exports = sequelize.models
