const BoardService = require('../services/board.service')

class BoardController{
    boardService = new BoardService()

    createBoard = async (req, res, next) => {
        try{
            // const { userId } = req.locals.user 로그인 기능 생기면 적용
            const { title, content, color } = req.body;
            const { code, result } = await this.boardService.createBoard({ userId, title, content, color })
            return res.status(code).json({ board: result });
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