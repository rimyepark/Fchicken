const BoardRepository = require('../repositories/board.repository')

class BoardService{
    boardRepository = new BoardRepository()

    createBoard = async ({ userId, title, content, color }) =>{
        if(!title||!content) throw { code:401, message: '모두 기입해 주세요.' }
    
        if(!userId) throw { code:401, message:'생성자를 찾을 수 없습니다.' }

        const result = await this.boardRepository.create({ userId, title, content, color })

        return { code:200, result }
    }

}

module.exports = BoardService