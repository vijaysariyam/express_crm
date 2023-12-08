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
				allowNull: false,
			},
			degree: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			major: {
				type: DataTypes.STRING(100),
				allowNull: false,
				timestamps: false,
			},
		},
		{
			tableName: 'education_t',
			engine: 'InnoDB',
		}
	);

	return Education;
};
