module.exports = (sequelize, DataTypes) => {
	const Skill = sequelize.define(
		'skill_t',
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
			skill: {
				type: DataTypes.STRING(100),
			},
			level: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: 'skill_t',
			engine: 'InnoDB',
		}
	);

	return Skill;
};
