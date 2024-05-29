const express = require('express');
const router = express.Router();
const Product = require('../models/MenuItem');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).limit(5);
    res.render('landingpage', { title: 'Home', featuredProducts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
