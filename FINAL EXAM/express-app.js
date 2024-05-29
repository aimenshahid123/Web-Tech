const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser"); // Correct import statement
const path = require('path');
const expressSession = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const authMiddleware = require("./middleware/auth");
const MenuItem = require("./models/MenuItem");
const visitedProductsRouter = require('./routes/visited-products'); 
const productsRouter = require('./routes/product');
let server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser()); // Correct usage
server.use(expressSession({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
server.use(express.static("public"));
server.use(ejsLayouts);

// Set view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, 'views'));

// Route for landing page
server.get('/', (req, res) => {
  console.log('Landing page is rendering');
  res.render('landingpage');
});

// Route for contact page
server.get('/contact', (req, res) => {
  res.render('contact', {
    styles: '<link rel="stylesheet" href="/css/contact.css">'
  });
});

// Routes for partials
server.get('/partials/header', (req, res) => {
  res.render('partials/header');
});

server.get('/partials/navbar', (req, res) => {
  res.render('partials/navbar');
});

server.get('/partials/footer', (req, res) => {
  res.render('partials/footer');
});

// Serve the uploaded images
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Include authentication routes
server.use("/", require("./routes/auth"));

// Include menu routes
server.use("/menu", require("./routes/menu"));

// Protected route
server.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});
server.use('/product',productsRouter);
server.use('/visited-products', visitedProductsRouter);

// Cart route
server.get("/cart", authMiddleware, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let menu = await MenuItem.find({ _id: { $in: cart } });
  res.render("cart", { menu });
});

// Connect to MongoDB and start server
mongoose.connect("mongodb://localhost:27017/WEB-TECH")
  .then(() => {
    console.log("DB Connected");
    // Start the server after database connection is established
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });
