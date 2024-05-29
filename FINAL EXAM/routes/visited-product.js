const express = require('express');
const router = express.Router();
const Product = require('../models/MenuItem');

// GET visited products
router.get('/', async (req, res, next) => {
  try {
    if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
      return res.render('visited-products', { title: 'Visited Products', visitedProducts: [] });
    }

    const visitedProducts = await Product.find({ _id: { $in: req.session.visitedProducts } });

    res.render('visited-products', { title: 'Visited Products', visitedProducts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
