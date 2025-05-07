// models/profile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Import User model

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT,  // or DataTypes.INTEGER
    allowNull: false
  },
  isGirl: {
    type: DataTypes.BOOLEAN,  // true = girl, false = boy
    allowNull: false
  },
  isStudent: {
    type: DataTypes.BOOLEAN,  // true = student, false = in work
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Relationship: A Profile belongs to a User
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
