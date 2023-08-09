const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
router.get("/card/:cardId/comments", commentsController.getComments);
router.post("/card/:cardId/comments", commentsController.createComments);
router.put("/card/:cardId/comments/:commentId", commentsController.updateComments);
router.delete("/card/:cardId/comments/:commentId", commentsController.deleteComments);

module.exports = router;
