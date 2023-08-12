const { Comments, CardInfos, Cards, Users } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {
  //댓글 등록
  createComments = async ({ createUser, cardId, content }) => {
    const createdComment = await Comments.create({ createUser, cardId, content });
    return createdComment;
  };
  // 댓글 조회
  findAllComments = async (cardId) => {
    const result = await Comments.findAll({
      attributes: ["content"],
      where: { cardId },
      include: [
        {
          model: Cards,
          as: "CardInfos", // 추가된 부분
          attributes: [],
          include: [
            {
              model: CardInfos,
              attributes: ["userId"],
              include: [
                {
                  model: Users,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    // 사용자 이름을 가진 댓글 데이터로 만듭니다.
    const comments = result.map((comment) => ({
      content: comment.content,
      userName: comment.CardInfo.CardInfo.User.name,
    }));

    return comments;
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
