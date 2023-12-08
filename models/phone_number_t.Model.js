module.exports = (sequelize, DataTypes) => {
	const PhoneNumber = sequelize.define(
		'phone_number_t',
		{
			id: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			candidate_id: {
				type: DataTypes.STRING(36),
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			number: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			tableName: 'phone_number_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return PhoneNumber;
};
