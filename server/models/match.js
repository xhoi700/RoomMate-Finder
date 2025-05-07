// models/match.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  matchedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'  // status can be 'active', 'inactive', 'pending'
  }
});

// Relationships: A Match belongs to two Users
Match.belongsTo(User, { foreignKey: 'userId' });
Match.belongsTo(User, { foreignKey: 'matchedUserId' });

module.exports = Match;
