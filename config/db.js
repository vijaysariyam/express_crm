const Sequelize = require('sequelize');
const CountryModel = require('../models/country.model');

const UserModel = require('../models/user_t.Model');
const AddressModel = require('../models/address_t.Model');
const CandidateModel = require('../models/candidate_t.Model');
const PhoneNumberModel = require('../models/phone_number_t.Model');
const EducationModel = require('../models/education_t.Model');
const SkillModel = require('../models/skill_t.Model');
const ExperienceModel = require('../models/experience_t.Model');
const CurrencyModel = require('../models/currency_t.Model');

const sequelize = new Sequelize('u276789778_polling_survey', 'u276789778_polling_survey', '123@Mango', {
	dialect: 'mysql',
	host: '62.72.28.52',
	port: 3306,
	logging: false,
});

const Country = CountryModel(sequelize, Sequelize);

const User = UserModel(sequelize, Sequelize);
const Address = AddressModel(sequelize, Sequelize);
const Candidate = CandidateModel(sequelize, Sequelize);
const PhoneNumber = PhoneNumberModel(sequelize, Sequelize);
const Education = EducationModel(sequelize, Sequelize);
const Skill = SkillModel(sequelize, Sequelize);
const Experience = ExperienceModel(sequelize, Sequelize);
const Currency = CurrencyModel(sequelize, Sequelize);

const Models = {
	Country,
	User,
	Address,
	Candidate,
	PhoneNumber,
	Education,
	Skill,
	Experience,
	Currency,
};
const connection = {};

module.exports = async () => {
	if (connection.isConnected) {
		console.log('=> Using existing connection.');
		return { sequelize, ...Models };
	}

	await sequelize.sync();
	await sequelize.authenticate();
	connection.isConnected = true;
	console.log('=> Got New Api Request. Create Connection');
	return { sequelize, ...Models };
};
