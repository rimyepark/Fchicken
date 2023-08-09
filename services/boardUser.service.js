const BoardUserRepository = require('../repositories/boardUser.repository')

class BoardUserService{
    boardUserRepository = new BoardUserRepository()

    create = async ({ userId, boardId }) =>{
        if(!userId) throw { code:401, message:'생성자를 찾을 수 없습니다.' }

        if(!boardId) throw { code:401, message:'보드 그룹생성에 문제발생.' }

        await this.boardUserRepository.create({ userId, boardId })

        return { code:200, result:'보드그룹 생성에 성공하였습니다.' }
    }

}

module.exports = BoardUserService