module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user_t',
		{
			id: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			tableName: 'user_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return User;
};
