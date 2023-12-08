const connectToDatabase = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const { requestUserTokens } = require('../services/jwt.js');
// Get all data
const getAll = async (req, res) => {
	try {
		const { User } = await connectToDatabase();
		const data = await User.findAll();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Get data by ID
const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const { User } = await connectToDatabase();
		const data = await User.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new data
const create = async (req, res) => {
	const { email, password, first_name, last_name } = req.body;
	const id = uuidv4();
	try {
		const { User } = await connectToDatabase();
		const newUser = await User.create({ id, email, password, first_name, last_name });

		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' + error });
	}
};

// Update data by ID
const updateById = async (req, res) => {
	const { id } = req.params;
	const { email, password, first_name, last_name } = req.body;
	try {
		const { User } = await connectToDatabase();
		const data = await User.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'User not found' });
		}
		await data.update({ email, password, first_name, last_name });
		res.status(200).json({ message: 'User updated successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Delete data by ID
const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		const { User } = await connectToDatabase();
		const data = await User.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'User not found' });
		}
		await data.destroy();
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new data
const register = async (req, res) => {
	const { email, password, first_name, last_name } = req.body;
	const id = uuidv4();
	try {
		const { User } = await connectToDatabase();
		const newUser = await User.create({ id, email, password, first_name, last_name });
		const userJson = { ...newUser.toJSON() };
		delete userJson.password;
		res.status(200).json(userJson);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' + error });
	}
};

// Get data by ID
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { User } = await connectToDatabase();
		const data = await User.findOne({
			where: {
				email: email,
				password: password,
			},
		});
		if (data) {
			//need data row
			const tokens = requestUserTokens(data.dataValues);
			res.status(200).json(tokens);
		} else {
			return res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' + error });
	}
};

const referesh = async (req, res) => {
	const { id } = req.body;
	try {
		if (!id) {
			res.status(500).json({ error: 'Bad Request' });
		}
		const tokens = requestUserTokens({ id });
		res.status(200).json(tokens);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' + error });
	}
};

module.exports = { referesh, login, register, getAll, getById, create, updateById, deleteById };
