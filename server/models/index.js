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
