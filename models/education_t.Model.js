module.exports = (sequelize, DataTypes) => {
	const Education = sequelize.define(
		'education_t',
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
			school: {
				type: DataTypes.STRING(255),
			},
			degree: {
				type: DataTypes.STRING(100),
			},
			major: {
				type: DataTypes.STRING(100),
			},
		},
		{
			tableName: 'education_t',
			engine: 'InnoDB',
		}
	);

	return Education;
};
