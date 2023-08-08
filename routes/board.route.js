const express = require('express');
const router = express.Router();

const BoardController = require('../controllers/board.controller')
const boardController = new BoardController();

router.post('/board', boardController.createBoard);
// router.post('/board/:userId', boardController.createUser.invite)
// router.put('/board/:boardId', boardController.createBoard.putBoard);
// router.delete('/board/:boardId', boardController.createBoard.deleteBoard);

module.exports = router;