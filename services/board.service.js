const BoardRepository = require("../repositories/board.repository");
const BoardUserRepository = require("../repositories/boardUser.repository");

class BoardService {
  boardRepository = new BoardRepository();
  boardUserRepository = new BoardUserRepository();

  get = async ({UserId})=> {
    const board = await this.boardUserRepository.findAll({userId:UserId})

    if(!board) throw { code:401, message: "보드를 찾을 수 없습니다." }
  
    return {board}
  }

  createBoard = async ({ userId, title, content, color }) => {
    if (!title || !content || !color)
      throw { code: 401, message: "모두 기입해 주세요." };

    if (!userId) throw { code: 401, message: "생성자를 찾을 수 없습니다." };

    const board = await this.boardRepository.create({ createUser:userId, title, content, color });

    return { board, code: 200, result: "보드생성에 성공하였습니다." };
  };

  putBoard = async ({ userId, boardId, title, content, color }) => {
    if (!userId) throw { code: 401, message: "사용자를 찾을 수 없습니다." };

    if (!boardId) throw { code: 401, message: "보더를 찾을 수 없습니다." };

    const access = await this.boardUserRepository.findOne({ userId, boardId });
    if (!access) throw { code: 401, massage: "접근 권한이 없습니다." };

    if (!title || !content || !color)
      throw { code: 401, message: "모두 기입해 주세요." };

    await this.boardRepository.update(
      { title: title, content: content, color: color },
      [{ BoardId: boardId }]
    );
    return { code: 200, message: "수정완료" };

  };

  deleteBoard = async  ({ userId, boardId }) => {

    if(!userId) throw { code:401, message:'생성자를 찾을 수 없습니다.' }

    if(!boardId) throw { code:401, message:'보드를 찾지 못했습니다.' }

    const info = await this.boardUserRepository.findOne({ userId, boardId })
    if(userId !== Number(info.userId)) throw { code:403, message:'보드접근 권한이 없습니다.'}

    if(userId === Number(info.userId)) this.boardRepository.delete({ boardId })
    return  { code: 200, message: "삭제완료" };
}
}

module.exports = BoardService;
