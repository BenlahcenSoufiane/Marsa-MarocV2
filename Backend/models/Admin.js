// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Admin = sequelize.define('Admin', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privilege: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  stoped :{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: true,
  }
});

module.exports = Admin;