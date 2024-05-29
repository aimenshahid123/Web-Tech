
// const MenuItem = require('../models/MenuItem');
// const multer = require('multer');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// async function getAllItems(req, res)  {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 9; // Number of items per page
//     const totalItems = await MenuItem.countDocuments();
//     const totalPages = Math.ceil(totalItems / pageSize);
//     const items = await MenuItem.find()
//                                 .skip((page - 1) * pageSize)
//                                 .limit(pageSize)
//                                 .exec();

//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }

//     res.render('itemlist', {
//       items: items,
//       currentPage: page,
//       totalPages: totalPages,
//       pages: pages
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// addItem = [
//   upload.single('image'), // Middleware to handle image upload
//   async (req, res) => {
//     try {
//       console.log("Received request to add item");
//       console.log("Request body:", req.body);
//       console.log("Request file:", req.file);

//       const { name, description, price } = req.body;
//       const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//       if (!imagePath) {
//         throw new Error("Image upload failed");
//       }

//       const newItem = new MenuItem({ name, description, price, imagePath });
//       await newItem.save();
//       console.log("New item added:", newItem);
//       res.redirect('/itemlist');
//     } catch (err) {
//       console.error("Error adding item:", err.message);
//       res.status(400).json({ error: err.message });
//     }
//   }
// ];


// // updateItem = [
// //   upload.single('image'), // Middleware to handle image upload
// //   async (req, res) => {
// //     try {
// //       const { id } = req.params.id;
// //       const { name, description, price } = req.body;
// //       let imagePath = null;

// //       if (req.file) {
// //         imagePath = `/uploads/${req.file.filename}`;
// //       }

// //       const updatedFields = { name, description, price };
// //       if (imagePath) {
// //         updatedFields.imagePath = imagePath;
// //       }

// //       const updatedItem = await MenuItem.findByIdAndUpdate(id, updatedFields, { new: true });
// //       if (!updatedItem) {
// //         return res.status(404).json({ error: 'Item not found' });
// //       }

// //       res.redirect('/itemlist');
// //     } catch (err) {
// //       res.status(400).json({ error: err.message });
// //     }
// //   }
// // ];

// //  async function deleteItem(req, res)  {
// //   try {
// //     const { id } = req.params.id;
// //     const deletedItem = await MenuItem.findByIdAndDelete(id);
// //     console.log("deleted item")
// //     if (!deletedItem) {
// //       return res.status(404).json({ error: 'Item not found' });
// //     }

// //     res.redirect('/itemlist');
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// module.exports = {getAllItems,addItem}