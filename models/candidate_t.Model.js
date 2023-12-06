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
			},
			last_name: {
				type: DataTypes.STRING(100),
			},
			age: {
				type: DataTypes.INTEGER,
			},
			department: {
				type: DataTypes.STRING(100),
			},
			min_salary_expectation: {
				type: DataTypes.DECIMAL(10, 2),
			},
			max_salary_expectation: {
				type: DataTypes.DECIMAL(10, 2),
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
		}
	);

	return Candidate;
};
