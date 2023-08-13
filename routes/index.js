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
  const { boardId } = req.query;
  res.redirect("./creat_columns.html"),{boardId};
});

router.put("/columns/:ColumnId", (req, res) => {
  const { ColumnId } = req.query;
  res.redirect("./columns.html"),{ColumnId};
});

router.get("/cards/:CardId", (req, res) => {
  const { CardId } = req.query;
  res.redirect("./columns.html"),{CardId};
});

router.post("/boards", (req, res) => {
  res.redirect("./createBoard.html");
});


module.exports = router;
