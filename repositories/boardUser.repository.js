const { BoardInfos } = require('../models')


class BoardUserRepository{
    // 보드인포 생성
    create = async ({ userId, boardId })=>{
       return await BoardInfos.create({ userId, boardId })
    }

    // 권한 확인용 인포 찾기기능
    findOne = async ({userId, boardId}) =>{
        return await BoardInfos.findOne({userId, boardId})
    }
}

module.exports = BoardUserRepository