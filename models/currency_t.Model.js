module.exports = (sequelize, DataTypes) => {
	const Currency = sequelize.define(
		'currency_t',
		{
			id: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING(3),
				allowNull: false,
				unique: true,
			},
		},
		{
			tableName: 'currency_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return Currency;
};
