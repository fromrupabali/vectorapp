const Sequelize = require('sequelize');

const sequelize = new Sequelize("vectortest", "root", "momin123", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false
});

module.exports = sequelize;
global.sequelize = sequelize;