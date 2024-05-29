const express = require("express");
let router = express.Router();
let MenuItem = require("../../models/MenuItem");

router.post("/api/MenuItem", async function (req, res) {
  let data = req.body;
  let menu = new MenuItem(data);
  await menu.save();
  res.send(menu);
});


router.delete('/api/MenuItem/:id', async function (req, res) {
  try {
    let menu = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).send("Record Not Found");
    res.send(menu);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


// Update existing MenuItem
router.post("/api/MenuItem/:id", async function (req, res) {
  try {
    let menu = await MenuItem.findById(req.params.id);
    if (!menu) return res.status(404).send("Record Not Found");
    
    menu.name = req.body.name;
    menu.description = req.body.description;
    menu.price = req.body.price; // Corrected field assignment
    menu.imagePath = req.body.imagePath; // Added field assignment
    menu.quantity = req.body.quantity;
    
    await menu.save();
    res.send(menu);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/MenuItem/:id", async function (req, res) {
  let menu = await MenuItem.findById(req.params.id);
  res.send(menu);
});

router.get("/api/MenuItem", async function (req, res) {
  let menu = await MenuItem.find();
  res.send(menu);
});

module.exports = router;
