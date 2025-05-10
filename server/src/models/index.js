import sequelize from '../../config/database.js'; // fixed path
import { UserModel } from './user.js';
import { MatchModel } from './match.js';

const User = UserModel(sequelize);
const Match = MatchModel(sequelize);

// Define associations
User.hasMany(Match, { foreignKey: 'requesterId', as: 'requestedMatches' });
User.hasMany(Match, { foreignKey: 'recipientId', as: 'receivedMatches' });

Match.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
Match.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

export { sequelize, User, Match };
