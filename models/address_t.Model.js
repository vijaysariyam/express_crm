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
			},
			street_address: {
				type: DataTypes.STRING(255),
			},
			city: {
				type: DataTypes.STRING(100),
			},
			state: {
				type: DataTypes.STRING(100),
			},
			postal_code: {
				type: DataTypes.STRING(20),
			},
		},
		{
			tableName: 'address_t',
			engine: 'InnoDB',
		}
	);

	return Address;
};
