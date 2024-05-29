let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let User = require("../models/User");
let authMiddleware = require("../middleware/auth");
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  try {
    // Validate input
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User with this username already exists.");
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error); // Log the error to the console
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    let user = await User.findOne({ email });
    if (!user) return res.redirect("/signup");

    let match = await bcrypt.compare(password, user.password);
    if (!match) return res.redirect("/login");

    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error); // Log the error to the console
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;


// let express = require("express");
// let router = express.Router();
// let User = require("../models/User");

// router.get("/signup", (req, res) => {
//   res.render("auth/signup");
// });

// router.post("/signup", async (req, res) => {
//   let user = new User(req.body);
//   await user.save();
//   res.redirect("/login");
// });

// router.get("/logout", (req, res) => {
//   req.session.user = null;
//   res.redirect("/login");
// });

// router.get("/login", (req, res) => {
//   res.render("auth/login");
// });

// router.post("/login", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.redirect("/signup");
//   if (user.password != req.body.password) return res.redirect("/login");
//   req.session.user = user;
//   return res.redirect("/");
// });

// module.exports = router;