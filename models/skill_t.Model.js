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
				allowNull: false,
			},
			level: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: 'skill_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return Skill;
};
