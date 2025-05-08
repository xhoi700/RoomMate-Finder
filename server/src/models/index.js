import sequelize from "../../config/database.js"; // your configured Sequelize instance
import { UserModel } from "./user.js";

const User = UserModel(sequelize);

export { sequelize, User };
