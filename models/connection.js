const { Sequelize} = require('sequelize');
const dbconfig = require("../config/database.config.js");
const DB_NAME = dbconfig.database;
const USER_NAME = dbconfig.username;
const PASSWORD = dbconfig.password;
const sequelize = new Sequelize(DB_NAME, USER_NAME,PASSWORD, {
    host: 'localhost',
    dialect:  'mysql',
});

module.exports = sequelize;







