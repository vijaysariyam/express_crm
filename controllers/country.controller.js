const connectToDatabase = require("../config/db");
async function create(req, res) {
    try {
        const {Country} = await connectToDatabase();

        const data = await Country.create(req.body);
        return res.status(200).json({message: data });
    }catch(e) {
        return res.status(500).json({ error: e.message });
    }
}

async function getAll(req, res) {
    try {
        const {Country} = await connectToDatabase();

        const data = await Country.findAll();
        return res.status(200).json({message : data});
    }catch(e) {
        return res.status(500).json({ error: e.message});
    }
}

async function getById(req, res) {
    try {
        const {Country} = await connectToDatabase();

        const data = await Country.findByPk(req.params.id);
        if (!data) throw new HTTPError(404, `id: ${req.params.id} was not found`);
        return res.status(200).json({ message: data });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}

async function updateById(req, res) {
    try {
      const { Country } = await connectToDatabase();
      const data = await Country.findByPk(req.params.id);
      if (!data) throw new HTTPError(404, `id: ${req.params.id} was not found`);
      if (req.body.title) data.title = req.body.title;
      if (req.body.description) data.description = req.body.description;
      await data.save();
      return res.status(200).json({ message: data });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  

  async function deletedById(req, res) {
    try {
      const { Country } = await connectToDatabase();
      const data = await Country.findByPk(req.params.id);
      if (!data) throw new HTTPError(404, `id: ${req.params.id} was not found`);
      await data.destroy();
      return res.status(200).json({ message: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = {
    getById,
    getAll,
    create,
    updateById,
    deletedById,
  };
  