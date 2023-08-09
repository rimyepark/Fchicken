const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
router.get("/card/:cardId/comments", authMiddleware, commentsController.getComments);
router.post("/card/:cardId/comments", authMiddleware, commentsController.createComments);
router.put("/card/:cardId/comments/:commentId", authMiddleware, commentsController.updateComments);
router.delete("/card/:cardId/comments/:commentId", authMiddleware, commentsController.deleteComments);

module.exports = router;
