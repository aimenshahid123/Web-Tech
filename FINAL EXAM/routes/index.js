const express = require('express');
const router = express.Router();
const Product = require('../models/MenuItem');

// GET a single product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (!req.session.visitedProducts) {
      req.session.visitedProducts = [];
    }

    // Add product ID to visitedProducts array if not already present
    if (!req.session.visitedProducts.includes(req.params.id)) {
      req.session.visitedProducts.push(req.params.id);
    }

    res.render('product', { title: 'Product Detail', product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
