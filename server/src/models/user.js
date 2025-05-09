import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export const UserModel = (sequelize) => {
  class User extends Model {
    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,

        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "First name cannot be empty" },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Last name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: { msg: "Email address already in use" },
        validate: {
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100],
            msg: "Password must be at least 8 characters",
          },
        },
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "other",
        validate: {
          isIn: {
            args: [["male", "female", "other"]],
            msg: "Gender must be one of: male, female, other",
          },
        },
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "unknown",
        validate: {
          notEmpty: { msg: "City cannot be empty" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "unknown",
        validate: {
          notEmpty: { msg: "Address cannot be empty" },
        },
      },
      budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: "unknown",
        validate: {
          min: { args: [0], msg: "Budget must be a non-negative number" },
        },
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: {
            args: [["student", "employee"]],
            msg: "Role must be student or employee",
          },
        },
      },
      homePet: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          notEmpty: { msg: "Home pet cannot be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        filterByCity(city) {
          return { where: { city } };
        },
        filterByAddress(address) {
          return { where: { address } };
        },
        filterByBudget(budget) {
          return { where: { budget } };
        },
        filterByBudgetRange(min, max) {
          return { where: { budget: { [Op.between]: [min, max] } } };
        },
        filterByRole(role) {
          return { where: { role } };
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
