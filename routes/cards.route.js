const express = require("express");
const router = express.Router();

const CardController = require("../controllers/cards.controller");
const cardController = new CardController();
const authMiddleware = require("../middlewares/auth");

router.post("/columns/:ColumnId/cards", authMiddleware, cardController.createCard);
router.get("/cards/:CardId", cardController.findOneCard);
router.delete("/cards/:CardId", cardController.deleteCard);
router.put("/cards/:CardId", cardController.updateCard);

module.exports = router;
