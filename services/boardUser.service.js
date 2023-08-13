const BoardUserRepository = require("../repositories/boardUser.repository");
const BoardRepository = require("../repositories/board.repository");
const UserRepository = require("../repositories/user.repository")

class BoardUserService {
  boardUserRepository = new BoardUserRepository();
  boardRepository = new BoardRepository();
  userRepository = new UserRepository()

  create = async ({ userId, boardId }) => {
    if (!userId) throw { code: 401, message: "생성자를 찾을 수 없습니다." };

    if (!boardId) throw { code: 401, message: "보드 그룹생성에 문제발생." };

    await this.boardUserRepository.create({ userId, boardId });

    return { code: 200, result: "보드그룹 생성에 성공하였습니다." };
  };

  invite = async ({ userId, boardId, email }) => {
    if (!userId) throw { code: 401, message: "생성자를 찾을 수 없습니다." };

    if (!boardId) throw { code: 401, message: "보드를 찾지 못했습니다." };

    const info = await this.boardUserRepository.findOne({ userId:userId, boardId:boardId });

    if (userId !== Number(info.userId))
      throw { code: 403, message: "보드접근 권한이 없습니다." };

    const inviteUser = await this.userRepository.getUser({email})
        
    const boardInfo = await this.boardUserRepository.create({ userId:inviteUser.UserId, boardId })
        return { code:200, result:boardInfo }
    }



}

module.exports = BoardUserService;
