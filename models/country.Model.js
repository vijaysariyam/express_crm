module.exports = (sequelize, DataTypes) => {
	const Country = sequelize.define(
		'Country',
		{
			countryid: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			countryname: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			state_name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			tableName: 'country', // Define the table name explicitly (not necessary if the model name is in singular and lowercase)
			engine: 'InnoDB',
			timestamps: true, // Set to true if you want Sequelize to create createdAt and updatedAt columns
			// Other options if needed
		}
	);

	return Country;
};
