const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {type: String,required: true},
  isFeatured: {type: Boolean,default: false},

});
  
const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menuitems'); 
// const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;

