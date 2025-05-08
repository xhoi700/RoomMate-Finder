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
<<<<<<< HEAD
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isGirl: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isStudent: {
    type: DataTypes.BOOLEAN,
=======
    type: DataTypes.FLOAT,  // or DataTypes.INTEGER
    allowNull: false
  },
  isGirl: {
    type: DataTypes.BOOLEAN,  // true = girl, false = boy
    allowNull: false
  },
  isStudent: {
    type: DataTypes.BOOLEAN,  // true = student, false = in work
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
<<<<<<< HEAD
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
=======
  }
});

// Relationship: A Profile belongs to a User
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
