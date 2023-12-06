const connectToDatabase = require('../config/db');

// Get all data
const getAll = async (req, res) => {
	try {
		const { Education } = await connectToDatabase();
		const data = await Education.findAll();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Get data by ID
const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Education } = await connectToDatabase();
		const data = await Education.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Education not found' });
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new data
const create = async (req, res) => {
	const { id, email, password, first_name, last_name } = req.body;
	try {
		const { Education } = await connectToDatabase();
		const newUser = await Education.create({ id, email, password, first_name, last_name });
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Update data by ID
const updateById = async (req, res) => {
	const { id } = req.params;
	const { email, password, first_name, last_name } = req.body;
	try {
		const { Education } = await connectToDatabase();
		const data = await Education.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Education not found' });
		}
		await data.update({ email, password, first_name, last_name });
		res.status(200).json({ message: 'Education updated successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Delete data by ID
const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Education } = await connectToDatabase();
		const data = await Education.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Education not found' });
		}
		await data.destroy();
		res.status(200).json({ message: 'Education deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getAll, getById, create, updateById, deleteById };
