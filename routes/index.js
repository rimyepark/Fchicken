const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/index.html");
});

router.get("/signup", (req, res) => {
  res.redirect("./signup.html");
});

router.get("/signIn", (req, res) => {
  res.redirect("./signIn.html");
});

router.get("/editpassword", (req, res) => {
  res.redirect("./user.html");
});

module.exports = router;
