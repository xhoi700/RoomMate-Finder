<<<<<<< HEAD
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("roommatefinder", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
=======
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('roommatefinder', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
});

module.exports = sequelize;
