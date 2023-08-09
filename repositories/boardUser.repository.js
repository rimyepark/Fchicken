const { BoardInfos } = require('../models')


class BoardUserRepository{
    // 보드인포 생성
    create = async ({ userId, boardId })=>{
       return await BoardInfos.create({ userId, boardId })
    }
}

module.exports = BoardUserRepository