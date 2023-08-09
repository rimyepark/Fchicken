const BoardService = require("../services/board.service");
const BoardUserService = require("../services/boardUser.service");

class BoardController {
  boardService = new BoardService();
  boardUserService = new BoardUserService();

  // 보더 생성
  createBoard = async (req, res, next) => {
    try {
      const { title, content, color } = req.body;
      const { UserId } = req.session.user;
      const { board, code, result } = await this.boardService.createBoard({
        userId: UserId,
        title,
        content,
        color,
      });
      await this.boardUserService.create({
        userId: UserId,
        boardId: board.BoardId,
      });
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생");
    }
  };

  // 초대기능
  invite = async (req, res, next) => {
    try {
      const { UserId } = req.session.user;
      const { email } = req.body;
      const { boardId } = req.params;
      const { code, result } = await this.boardUserService.invite({
        userId: UserId,
        boardId,
        email,
      });
      return res.status(code).json({ result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생");
    }
  };

  // 보드 수정기능
  putBoard = async (req, res, next) => {
    try {
      const { title, content, color } = req.body;
      const { boardId } = req.params;
      const { UserId } = req.session.user;
      const { code, message } = await this.boardService.putBoard({
        userId: UserId,
        boardId,
        title,
        content,
        color,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생");
    }
  };

  // 보드 삭제기능
  deleteBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { UserId } = req.session.user;
      const { code, message } = await this.boardService.deleteBoard({
        userId: UserId, boardId,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생");
    }
  };
}

module.exports = BoardController;
