const CommentsService = require("../services/columns.service");

class CommentsController {
  commentsService = new CommentsService();

  //댓글 등록
  createComments = async (req, res) => {
    try {
      const { cardId } = req.params;
      const { comment } = req.body;
      const createCommentData = await this.commentsService.createComments({ cardId, comment });
      res.status(200).json({ data: createCommentData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // 댓글 조회
  getComments = async (req, res) => {
    try {
      const comments = await this.commentsService.findAllComments();
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  updateComments = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
      const updatedComment = await this.commentsService.updateComment({ cardId, commentId, comment });
      res.status(200).json({ data: updatedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteComments = async (req, res) => {
    try {
      const { cardId, commentId } = req.params;
      const deletedComment = await this.commentsService.deleteComment(cardId, commentId);
      res.status(200).json({ message: "댓글이 삭제되었습니다.", data: deletedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = CommentsController;
