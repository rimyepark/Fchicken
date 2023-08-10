const { Comments } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {
  //댓글 등록
  createComments = async ({ createUser, cardId, content }) => {
    const createdComment = await Comments.create({ createUser, cardId, content });
    return createdComment;
  };
  // 댓글 조회
  findAllComments = async (cardId) => {
    const result = await Comments.findAll({ attributes: ["content", "createUser"] }, { where: { cardId } });

    return result;
  };
  //댓글 수정
  update = async (data, target) => {
    return await Comments.update(data, { where: { [Op.and]: target } });
  };

  saveComment = async (comment) => {
    return await comment.save();
  };

  //댓글 삭제
  delete = async (target) => {
    return await Comments.destroy({ where: { [Op.and]: target } });
  };
}

module.exports = CommentsRepository;
