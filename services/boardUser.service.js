const BoardUserRepository = require("../repositories/boardUser.repository");
const BoardRepository = require("../repositories/board.repository");

class BoardUserService {
  boardUserRepository = new BoardUserRepository();
  boardRepository = new BoardRepository();

  create = async ({ userId, boardId }) => {
    if (!userId) throw { code: 401, message: "생성자를 찾을 수 없습니다." };

    if (!boardId) throw { code: 401, message: "보드 그룹생성에 문제발생." };

    await this.boardUserRepository.create({ userId, boardId });

    return { code: 200, result: "보드그룹 생성에 성공하였습니다." };
  };

  invite = async ({ userId, boardId, email }) => {
    if (!userId) throw { code: 401, message: "생성자를 찾을 수 없습니다." };

    if (!boardId) throw { code: 401, message: "보드를 찾지 못했습니다." };

    const info = await this.boardUserRepository.findOne({ userId, boardId });
    if (userId !== Number(info.userId)) throw { code: 403, message: "보드접근 권한이 없습니다." };

    return { code: 200, result: "권한 확인용" };

    // 유저아키텍쳐패턴 적용완료시 사용가능
    // const user = await userRepository.findOne({email})
    // if(!user) throw { code:401, message:'이메일을 확인해 주세요' }

    const boardInfo = await this.boardUserRepository.invite({ userId: user.UserId, boardId });
    return { code: 200, result: boardInfo };
  };

  // deleteBoard = async
}

module.exports = BoardUserService;
