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

router.get("/columns", (req, res) => {
  res.redirect("./columns.html");
});

router.post("/boards/:boardId/columns", (req, res) => {
  res.redirect("./creat_columns.html");
});

router.put("/columns/:ColumnId", (req, res) => {
  res.redirect("./columns.html");
});

router.get("/cards/:CardId", (req, res) => {
  res.redirect("./columns.html");
});


module.exports = router;
