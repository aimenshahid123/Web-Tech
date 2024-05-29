
let express = require("express");
let router = express.Router();
let MenuItem = require("../models/MenuItem");

router.get('/new', (req, res) => {
  res.render('menu/new');  // Ensure this matches the file path
});

router.post("/new", async (req, res) => {
  let std = new MenuItem(req.body);
  await std.save();
  return res.redirect("/menu");
  //   return res.send(req.body);

  //   res.render("students/new");
});

router.get("/delete/:id", async (req, res) => {
  let std = await MenuItem.findByIdAndDelete(req.params.id);
  return res.redirect("/menu");
});
router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);

  // return res.send(req.cookies);
  return res.redirect("/menu");
});

router.get("/edit/:id", async function (req, res) {
  try {
    let menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).send("MenuItem not found");
    res.render("menu/edit", { MenuItem: menuItem });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/edit/:id", async (req, res) => {
  let menu = await MenuItem.findById(req.params.id);
  menu.name = req.body.name;
  menu.description = req.body.description;
  menu.price = req.body.price;
  menu.imagePath= req.body.imagePath;
  menu.quantity= req.body.quantity;
  await menu.save();
  return res.redirect("/menu");
});

router.get("/:page?", async (req, res) => {
  let pageTitle = "Menu Items";

  let page = req.params.page ? req.params.page : 1;
  let pageSize = 2;
  let skip = (page - 1) * pageSize;
  let total = await MenuItem.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let menu = await MenuItem.find().limit(pageSize).skip(skip);
  //   return res.send(students);
  return res.render("menu/list", {
    pageTitle,
    menu,
    page,
    pageSize,
    total,
    totalPages,
  });
});

module.exports = router;

