// src/models/match.js
import { Model, DataTypes } from 'sequelize';

export const MatchModel = (sequelize) => {
  class Match extends Model {}

  Match.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      requesterId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      recipientId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'accepted', 'rejected']],
            msg: 'Status must be one of pending, accepted, or rejected',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Match',
      tableName: 'matches',
      timestamps: true,
      underscored: true,
    }
  );

  return Match;
};
