const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const BoardController = require('../controllers/board.controller')
const boardController = new BoardController();

router.get('/boards', authMiddleware, boardController.getBoard);
router.post('/boards', authMiddleware, boardController.createBoard);
router.post('/boards/invite/:boardId',authMiddleware, boardController.invite)
router.put('/boards/:boardId', authMiddleware, boardController.putBoard);
router.delete('/boards/:boardId', authMiddleware, boardController.deleteBoard);

module.exports = router;