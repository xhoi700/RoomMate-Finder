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
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isGirl: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isStudent: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: { // Define userId explicitly
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Relationship
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
