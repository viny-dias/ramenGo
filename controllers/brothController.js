const Broth = require('../models/Broth');

exports.getAllBroths = async (req, res) => {
  try {
    const broths = await Broth.find();
    res.json(broths);
  } catch (error) {
    res.status(500).json({ message: 'Error getting broths' });
  }
};
