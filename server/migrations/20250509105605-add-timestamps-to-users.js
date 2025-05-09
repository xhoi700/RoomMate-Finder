export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "created_at", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  });

  await queryInterface.addColumn("users", "updated_at", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("users", "created_at");
  await queryInterface.removeColumn("users", "updated_at");
}
export async function up(queryInterface, Sequelize) {
  // 1) (Optional) backfill—only needed if you haven’t already:
  // await queryInterface.sequelize.query("UPDATE users SET city = 'unspecified' WHERE city IS NULL");
  // await queryInterface.sequelize.query("UPDATE users SET address = 'unspecified' WHERE address IS NULL");
  // await queryInterface.sequelize.query("UPDATE users SET budget = 0 WHERE budget IS NULL");
  // 2) change columns to NOT NULL
  await queryInterface.changeColumn('users', 'city', {
    type: Sequelize.STRING(100),
    allowNull: false,
  });
  await queryInterface.changeColumn('users', 'address', {
    type: Sequelize.TEXT,
    allowNull: false,
  });
  await queryInterface.changeColumn('users', 'budget', {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  });
}
export async function down(queryInterface, Sequelize) {
  // Revert back to nullable
  await queryInterface.changeColumn('users', 'city', {
    type: Sequelize.STRING(100),
    allowNull: true,
  });
  await queryInterface.changeColumn('users', 'address', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
  await queryInterface.changeColumn('users', 'budget', {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  });
}






