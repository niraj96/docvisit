const { Sequelize} = require('sequelize');
const dbconfig = require("../config/database.config.js");
const config = dbconfig.prod;
const HOST = config.host;
const DB_NAME = config.database;
const USER_NAME = config.username;
const PASSWORD = config.password;
const sequelize = new Sequelize(DB_NAME, USER_NAME,PASSWORD, {
    host: HOST,
    dialect:  'mysql',
});

module.exports = sequelize;







