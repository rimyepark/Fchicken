const BoardService = require('../services/board.service')
const BoardUserService = require('../services/boardUser.service')

class BoardController{
    boardService = new BoardService()
    boardUserService = new BoardUserService()

    // 보더 생성
    createBoard = async (req, res, next) => {
        try{
            const { title, content, color } = req.body;
            const { UserId } = req.session.user;
            const { board, code, result } = await this.boardService.createBoard({ userId:UserId, title, content, color })
            await this.boardUserService.create({ userId:UserId, boardId:board.BoardId})
            return res.status(code).json({ message: result });
         } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.message });
            console.error(err);
            res.status(500).send('알 수 없는 에러가 발생');
          }
    }

//  invite = async (req, res, next) => {
    //     try{
    //         return res.status(code).json({ posts: result });
    //      } catch (err) {
    //         if (err.code) return res.status(err.code).json({ message: err.message });
    //         console.error(err);
    //         res.status(500).send('알 수 없는 에러가 발생');
    //       }
    // }

// putBoard= async (req, res, next) => {
    //     try{
    //         return res.status(code).json({ posts: result });
    //      } catch (err) {
    //         if (err.code) return res.status(err.code).json({ message: err.message });
    //         console.error(err);
    //         res.status(500).send('알 수 없는 에러가 발생');
    //       }
    // }

// deleteBoard= async (req, res, next) => {
    //     try{
    //         return res.status(code).json({ posts: result });
    //      } catch (err) {
    //         if (err.code) return res.status(err.code).json({ message: err.message });
    //         console.error(err);
    //         res.status(500).send('알 수 없는 에러가 발생');
    //       }
    // }
}

module.exports = BoardController