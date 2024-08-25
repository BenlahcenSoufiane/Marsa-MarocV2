// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  MLE: {
    type: DataTypes.STRING,
    allowNull: false // Remove the unique constraint here
  },
  Name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  fonction: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  Affectation_Initiale: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  Affectation_Finale: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  Observation: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  Shift: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = User;
