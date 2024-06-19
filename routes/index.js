const express = require('express');
const router = express.Router();
const axios = require('axios');
const brothController = require('../controllers/brothController');
const proteinController = require('../controllers/proteinController');
const Broth = require('../models/Broth');
const Protein = require('../models/Protein');

// Get broths
router.get('/broths', brothController.getAllBroths);

// Get proteins
router.get('/proteins', proteinController.getAllProteins);

// Post order
router.post('/orders', async (req, res) => {
  const { brothId, proteinId } = req.body;

  try {
    const broth = await Broth.findOne({ id: brothId });
    const protein = await Protein.findOne({ id: proteinId });

    if (!broth || !protein) {
      return res.status(404).json({ message: 'Broth or Protein not found' });
    } 

    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf') {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
    }

    const response = await axios.post('https://api.tech.redventures.com.br/orders/generate-id', {}, {
      headers: {
        'x-api-key': apiKey
      }
    });

    const orderId = response.data.orderId;
    const orderName = `${broth.name} and ${protein.name} Ramen`;

    let imagePath = '';
    if (protein.name.includes('Karaague')) {
      imagePath = './img/karaague-ramen.svg';
    } else if (protein.name.includes('Chasu')) {
      imagePath = '/img/chasu-ramen.svg';
    } else if (protein.name.includes('Vegetarian')) {
      imagePath = '/img/vegetable-ramen.svg';
    } else {
      imagePath = '';
    }

    req.session.orderName = orderName;
    req.session.imagePath = imagePath;

    res.json({ id: orderId, description: orderName, imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing order' });
  }
});


// Success page
router.get('/success', (req, res) => {
  const orderName = req.session.orderName;
  const imagePath = req.session.imagePath;

  if (!orderName || !imagePath) {
    return res.status(400).send('Order information is missing.');
  }

  res.render('success', { orderName, imagePath });
});


// Initializing data
router.get('/', async (req, res) => {
  try {
    const broths = await Broth.find().lean();
    const proteins = await Protein.find().lean();

    const fullUrl = req.protocol + '://' + req.get('host');

    const brothsWithFullImageUrl = broths.map(broth => {
      return {
        ...broth,
        imageInactive: fullUrl + broth.imageInactive,
        imageActive: fullUrl + broth.imageActive
      };
    });

    const proteinsWithFullImageUrl = proteins.map(protein => {
      return {
        ...protein,
        imageInactive: fullUrl + protein.imageInactive,
        imageActive: fullUrl + protein.imageActive
      };
    });

    res.render('index', { 
      broths: brothsWithFullImageUrl || [], 
      proteins: proteinsWithFullImageUrl || [] 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


module.exports = router;
