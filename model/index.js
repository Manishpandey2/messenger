const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");
const { dbName, user, password, host, dialect, pool } = dbConfig;
const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect,
  pool,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("unable to connect to database", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("sync done");
});

module.exports = db;
