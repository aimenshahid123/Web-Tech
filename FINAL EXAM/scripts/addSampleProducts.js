const mongoose = require('mongoose');
const Product = require('../models/MenuItem'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/WEB-TECH' ,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleProducts = [
  { name: 'Product 1', description: 'Description 1', price: 10, category: 'Category 1', isFeatured: true },
  { name: 'Product 2', description: 'Description 2', price: 20, category: 'Category 2', isFeatured: false },
  { name: 'Product 3', description: 'Description 3', price: 30, category: 'Category 3', isFeatured: true },
  { name: 'Product 4', description: 'Description 4', price: 40, category: 'Category 4', isFeatured: false },
  { name: 'Product 5', description: 'Description 5', price: 50, category: 'Category 5', isFeatured: true },
  { name: 'Product 6', description: 'Description 6', price: 60, category: 'Category 6', isFeatured: false },
  { name: 'Product 7', description: 'Description 7', price: 70, category: 'Category 7', isFeatured: true }
];

Product.insertMany(sampleProducts)
  .then(() => {
    console.log('Sample products added');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error adding sample products:', err));
