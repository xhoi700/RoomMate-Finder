const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
<<<<<<< HEAD
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
=======
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
<<<<<<< HEAD
    allowNull: false
  }
}, {
=======
    allowNull: false, // Password is required
  }
}, {
  // Hooks to hash the password before saving to the database
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    }
  }
});

<<<<<<< HEAD
=======
// Method to compare passwords during login
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User;
