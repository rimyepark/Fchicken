const { Comments, sequelize } = require("../models");

class CommentsRepository {
  createComments = async (cardId, comment) => {
    const newComment = new Comment({ cardId, comment });
    return await newComment.save();
  };

  findAllComments = async () => {
    return await Comments.find();
  };

  updateComment = async (cardId, commentId, comment) => {
    return await Comments.findOneAndUpdate({ _id: commentId, cardId: cardId }, { comment }, { new: true });
  };

  deleteComment = async (cardId, commentId) => {
    return await Comments.findOneAndDelete({ _id: commentId, cardId: cardId });
  };
}

module.exports = CommentsRepository;
