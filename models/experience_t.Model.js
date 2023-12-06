module.exports = (sequelize, DataTypes) => {
	const Experience = sequelize.define(
		'experience_t',
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
			company: {
				type: DataTypes.STRING(255),
			},
			title: {
				type: DataTypes.STRING(100),
			},
			years: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: 'experience_t',
			engine: 'InnoDB',
		}
	);

	return Experience;
};
