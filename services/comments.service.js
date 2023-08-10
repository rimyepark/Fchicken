const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComments = async ({ userId, cardId, content }) => {
    if (!userId) throw { code: 401, message: "userId가 존재하지 않습니다." };

    if (!cardId) throw { code: 401, message: "cardId가 존재하지 않습니다." };

    if (!content) throw { code: 401, message: "댓글 내용을 입력해주세요." };

    const createCommentData = await this.commentsRepository.createComments({
      cardId,
      content,
      createUser: userId,
    });

    if (!createCommentData) throw { code: 401, message: "댓글 등록이 실패하였습니다. 않습니다." };

    return { createCommentData, code: 200, message: "게시글 작성이 완료되었습니다." };
  };

  findAllComments = async () => {
    const allComments = await this.commentsRepository.findAllComments();
    if (!Comments) {
      res.status(400).json({ error: " 실패하였습니다." });
    }

    res.status(200).json({ data: Comments });
  };

  updateComment = async ({ cardId, commentId, comment }) => {
    if (!cardId) {
      throw new Error("cardId가 존재하지 않습니다.");
    }
    if (!commentId) {
      throw new Error("commentId가 존재하지 않습니다.");
    }
    if (!comment) {
      throw new Error("댓글 내용을 입력 해주세요.");
    }

    const updatedComment = await this.commentsRepository.updateComment(cardId, commentId, comment);

    if (!updatedComment) {
      throw new Error("댓글 수정이 실패했습니다.");
    }

    return updatedComment;
  };

  deleteComment = async (cardId, commentId) => {
    if (!cardId) {
      throw new Error("cardId가 존재하지 않습니다.");
    }
    if (!commentId) {
      throw new Error("commentId가 존재하지 않습니다.");
    }

    const deletedComment = await this.commentsRepository.deleteComment(cardId, commentId);

    if (!deletedComment) {
      throw new Error("댓글 삭제가 실패했습니다.");
    }

    return deletedComment;
  };
}

module.exports = CommentsService;
