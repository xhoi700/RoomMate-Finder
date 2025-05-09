export async function up(queryInterface, Sequelize) {
	// 1) Add timestamps
	await queryInterface.addColumn('users', 'created_at', {
	  type: Sequelize.DATE,
	  allowNull: false,
	  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	});
	await queryInterface.addColumn('users', 'updated_at', {
	  type: Sequelize.DATE,
	  allowNull: false,
	  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	});
  
	// 2) Make existing columns NOT NULL
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
  
	// 3) Add new fields
	await queryInterface.addColumn('users', 'role', {
	  type: Sequelize.STRING(10),
	  allowNull: false,
	  defaultValue: 'student',        // backfills existing rows
	});
	await queryInterface.addColumn('users', 'home_pet', {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	});
	await queryInterface.addColumn('users', 'description', {
	  type: Sequelize.TEXT,
	  allowNull: true,
	});
  }
  
  export async function down(queryInterface, Sequelize) {
	// 1) Remove new fields
	await queryInterface.removeColumn('users', 'description');
	await queryInterface.removeColumn('users', 'home_pet');
	await queryInterface.removeColumn('users', 'role');
  
	// 2) Revert NOT NULL → NULL on existing columns
	await queryInterface.changeColumn('users', 'budget', {
	  type: Sequelize.DECIMAL(10, 2),
	  allowNull: true,
	});
	await queryInterface.changeColumn('users', 'address', {
	  type: Sequelize.TEXT,
	  allowNull: true,
	});
	await queryInterface.changeColumn('users', 'city', {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	});
  
	// 3) Remove timestamps
	await queryInterface.removeColumn('users', 'updated_at');
	await queryInterface.removeColumn('users', 'created_at');
  }
  