const Sequelize = require("sequelize");
const db = new Sequelize('messenger','meet','meet',{
  host : 'localhost',
  port : 5432,
  dialect : 'postgres',
  logging : false
});

module.exports = db;
