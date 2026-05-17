const dbConfig = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000,
  },
};

module.exports = dbConfig;
