const connectToDatabase = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Get all data
const getAll = async (req, res) => {
	try {
		const { Address } = await connectToDatabase();
		const data = await Address.findAll();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Get data by ID
const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Address } = await connectToDatabase();
		const data = await Address.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Address not found' });
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new data
const create = async (req, res) => {
	const { country, street_address, city, state, postal_code } = req.body;
	try {
		const id = uuidv4();
		const { Address } = await connectToDatabase();
		const newData = await Address.create({ id, country, street_address, city, state, postal_code });
		res.status(200).json(newData);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Update data by ID
const updateById = async (req, res) => {
	const { id } = req.params;
	const { country, street_address, city, state, postal_code } = req.body;
	try {
		const { Address } = await connectToDatabase();
		const data = await Address.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Address not found' });
		}
		if (country) data.country = country;
		if (street_address) data.street_address = street_address;
		if (city) data.city = req.body.city;
		if (state) data.email = state;
		if (postal_code) data.postal_code = postal_code;
		await data.save();
		res.status(200).json({ message: 'Address updated successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
};

// Delete data by ID
const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		const { Address } = await connectToDatabase();
		const data = await Address.findByPk(id);
		if (!data) {
			return res.status(404).json({ error: 'Address not found' });
		}
		await data.destroy();
		res.status(200).json({ message: 'Address deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getAll, getById, create, updateById, deleteById };
