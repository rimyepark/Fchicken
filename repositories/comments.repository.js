const { Comments } = require("../models");

class CommentsRepository {
  createComments = async ({ createUser, cardId, content }) => {
    const createdComment = await Comments.create({ createUser, cardId, content });
    return createdComment;
  };

  findAllComments = async () => {
    return await Comments.findAll();
  };

  updateComment = async (cardId, commentId, comment) => {
    return await Comments.findOneAndUpdate({ _id: commentId, cardId: cardId }, { comment }, { new: true });
  };

  deleteComment = async (cardId, commentId) => {
    return await Comments.findOneAndDelete({ _id: commentId, cardId: cardId });
  };
}

module.exports = CommentsRepository;
