const Protein = require('../models/Protein');

exports.getAllProteins = async (req, res) => {
  try {
    const proteins = await Protein.find();
    res.json(proteins);
  } catch (error) {
    res.status(500).json({ message: 'Error getting proteins' });
  }
};
