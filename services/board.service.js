const BoardRepository = require('../repositories/board.repository')

class BoardService{
    boardRepository = new BoardRepository()

    createBoard = async ({ userId, title, content, color }) =>{
        if(!title||!content||!color) throw { code:401, message: '모두 기입해 주세요.' }

        if(!userId) throw { code:401, message:'생성자를 찾을 수 없습니다.' }

        const board = await this.boardRepository.create({ title, content, color })

        return { board, code:200, result:'보드생성에 성공하였습니다.' }
    }

}

module.exports = BoardService