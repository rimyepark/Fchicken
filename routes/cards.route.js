const express = require('express');
const router = express.Router();

const CardController = require('../controllers/cards.controller');
const cardController = new CardController();

router.post('/columns/:columnId/cards', cardController.createCard);
router.get('/cards/:CardId', cardController.findOneCard);
router.delete('/cards/:CardId', cardController.deleteCard);
router.put('/cards/:cardId', cardController.updateCard);

module.exports = router;
