const connectToDatabase = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get all data
const getAll = async (req, res) => {
  try {
    const pageno = parseInt(req.query.pageno) || 1;
    const rowcount = parseInt(req.query.rowcount) || 10;
    const { Candidate } = await connectToDatabase();
    const data = await Candidate.findAll({
      where: {
        owner_id: req.user.id,
      },
      offset: (pageno - 1) * rowcount,
      limit: rowcount,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// WHERE owner_id = :ownerId
// 		AND

const search = async (req, res) => {
  try {
    const pageno = parseInt(req.query.pageno) || 1;
    const rowcount = parseInt(req.query.rowcount) || 10;
    const searchQuery = req.body.search || "";
    const { sequelize } = await connectToDatabase();

    const query = `
		SELECT *
      FROM candidate_t
      where owner_id = (:ownerId) AND 
	  (first_name LIKE :searchQuery OR last_name LIKE :searchQuery)
      LIMIT :offset, :limit
	  `;
    console.log(req.user.id);
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        ownerId: req.user.id,
        searchQuery: `%${searchQuery}%`,
        limit: rowcount,
        offset: (pageno - 1) * rowcount,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Get data by ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { sequelize } = await connectToDatabase();
    const query = `
    select 
	*,
	code as currency_code 
    from 
    candidate_t cd
    join
    currency_t c
    on cd.currency_id = c.id 
    where cd.id = :id
    `;
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        id: id,
      },
    });
    if (!data) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Create a new data
const create = async (req, res) => {
  const {
    first_name,
    last_name,
    age,
    department,
    min_salary_expectation,
    max_salary_expectation,
    currency_id,
    address_id,
  } = req.body;
  const id = uuidv4();

  try {
    const owner_id = req.user.id;
    const { Candidate } = await connectToDatabase();
    const newData = await Candidate.create({
      id,
      owner_id,
      first_name,
      last_name,
      age,
      department,
      min_salary_expectation,
      max_salary_expectation,
      currency_id,
      address_id,
    });
    res.status(200).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    age,
    department,
    min_salary_expectation,
    max_salary_expectation,
  } = req.body;
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "Bad Request" });
    }
    const { Candidate } = await connectToDatabase();
    const data = await Candidate.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (age) data.age = age;
    if (department) data.department = department;
    if (min_salary_expectation)
      data.min_salary_expectation = min_salary_expectation;
    if (max_salary_expectation)
      data.max_salary_expectation = max_salary_expectation;
    await data.save();

    res.status(200).json({ message: "Candidate updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Delete data by ID
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const { Candidate } = await connectToDatabase();
    const data = await Candidate.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    await data.destroy();
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

module.exports = { getAll, getById, create, updateById, deleteById, search };
