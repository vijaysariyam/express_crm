module.exports = (sequelize, DataTypes) => {
	const Address = sequelize.define(
		'address_t',
		{
			id: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			street_address: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			postal_code: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			tableName: 'address_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return Address;
};
