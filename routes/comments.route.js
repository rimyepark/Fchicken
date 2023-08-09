const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
router.get("/cards/:cardId/comments", authMiddleware, commentsController.getComments);
router.post("/cards/:cardId/comments", authMiddleware, commentsController.createComments);
router.put("/comments/:commentId", authMiddleware, commentsController.updateComments);
router.delete("/comments/:commentId", authMiddleware, commentsController.deleteComments);

module.exports = router;
