const mongoose = require('mongoose');

const proteinSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  imageInactive: {
    type: String,
    required: true
  },
  imageActive: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Protein = mongoose.model('Protein', proteinSchema);

module.exports = Protein;
