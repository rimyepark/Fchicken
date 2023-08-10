const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();

  //댓글 등록
  createComments = async (req, res, next) => {
    try {
      const { UserId } = req.session.user;
      const { cardId } = req.params;
      const { content } = req.body;
      const { createCommentData, code, message } = await this.commentsService.createComments({
        userId: UserId,
        cardId,
        content,
      });

      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send("알 수 없는 에러 발생");
    }
  };
  // 댓글 조회
  getComments = async (req, res, next) => {
    try {
      const comments = await this.commentsService.findAllComments();
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  updateComments = async (req, res, next) => {
    try {
      const { UserId } = req.session.user;
      const { commentId } = req.params;
      const { comment } = req.body;
      const updatedComment = await this.commentsService.updateComment({
        userId: UserId,
        commentId,
        comment,
      });
      res.status(200).json({ data: updatedComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  deleteComments = async (req, res, next) => {
    try {
      const { UserId } = req.session.user;
      const { commentId } = req.params;
      const deletedComment = await this.commentsService.deleteComment({
        userId: UserId,
        commentId,
      });

      res.status(200).json({ message: "댓글이 삭제되었습니다.", data: deletedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = CommentsController;
