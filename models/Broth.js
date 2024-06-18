const mongoose = require('mongoose');

const brothSchema = new mongoose.Schema({
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

const Broth = mongoose.model('Broth', brothSchema);

module.exports = Broth;
