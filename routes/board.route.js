const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const BoardController = require('../controllers/board.controller')
const boardController = new BoardController();

router.post('/board', authMiddleware, boardController.createBoard);
// router.post('/board/:userId',authMiddleware, boardController.invite)
router.put('/board/:boardId', authMiddleware, boardController.putBoard);
// router.delete('/board/:boardId', authMiddleware, boardController.deleteBoard);

module.exports = router;