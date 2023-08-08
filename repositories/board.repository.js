const { Boards } = require('../models')
const { BoardInfo } = require('../models')


class BoardRepository{
    // 모드생성 및, 보드인포 생성
    create = async ({ userId, title, content, color })=>{
        const { BoardId } = await Boards.create({ title, content, color })
        return await BoardInfo.create({ boardId:BoardId, userId})
    }
}

module.exports = BoardRepository