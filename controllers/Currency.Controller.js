const connectToDatabase = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Get all data
const getAll = async (req, res) => {
	try {
		const { Currency } = await connectToDatabase();
		const data = await Currency.findAll();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Get data by ID
const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Currency } = await connectToDatabase();
		const data = await Currency.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Currency not found' });
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new data
const create = async (req, res) => {
	const { code } = req.body;
	const id = uuidv4();

	try {
		const { Currency } = await connectToDatabase();
		const data = await Currency.create({ id, code });
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' + error });
	}
};

// Update data by ID
const updateById = async (req, res) => {
	const { id } = req.params;
	const { email, password, first_name, last_name } = req.body;
	try {
		const { Currency } = await connectToDatabase();
		const data = await Currency.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Currency not found' });
		}
		await data.update({ email, password, first_name, last_name });
		res.status(200).json({ message: 'Currency updated successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Delete data by ID
const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Currency } = await connectToDatabase();
		const data = await Currency.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Currency not found' });
		}
		await data.destroy();
		res.status(200).json({ message: 'Currency deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getAll, getById, create, updateById, deleteById };
