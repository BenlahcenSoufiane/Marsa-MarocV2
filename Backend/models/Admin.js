// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Admin = sequelize.define('Admin', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prev: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
}, {
  timestamps: true
});

module.exports = Admin;
