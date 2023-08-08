const express = require('express');
const router = express.Router();

const CardController = require('../controllers/cards.controller');
const cardController = new CardController();

router.post('/columns/:ColumnId/cards', cardController.createCard);
router.get('/cards/:CardId', cardController.findOneCard);
router.delete('/cards/:CardId', cardController.deleteCard);
router.put('/cards/:CardId', cardController.updateCard);

module.exports = router;
