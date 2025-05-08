<<<<<<< HEAD
// models/index.js
const User = require('./user');
const Profile = require('./profile');
const Match = require('./match');

// Associations
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Match, { foreignKey: 'userId', as: 'MatchesInitiated' });
User.hasMany(Match, { foreignKey: 'matchedUserId', as: 'MatchesReceived' });

Match.belongsTo(User, { foreignKey: 'userId', as: 'Initiator' });
Match.belongsTo(User, { foreignKey: 'matchedUserId', as: 'Receiver' });

module.exports = { User, Profile, Match };
=======
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
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
