module.exports = (sequelize, DataTypes) => {
	const Candidate = sequelize.define(
		'candidate_t',
		{
			id: {
				type: DataTypes.STRING(36),
				primaryKey: true,
				allowNull: false,
			},
			owner_id: {
				type: DataTypes.STRING(36),
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			department: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			min_salary_expectation: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			max_salary_expectation: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			currency_id: {
				type: DataTypes.STRING(36),
				allowNull: false,
			},
			address_id: {
				type: DataTypes.STRING(36),
				allowNull: false,
			},
		},
		{
			tableName: 'candidate_t',
			engine: 'InnoDB',
			timestamps: false,
		}
	);

	return Candidate;
};
