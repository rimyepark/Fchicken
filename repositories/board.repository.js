const { Boards } = require('../models')
const { BoardInfo } = require('../models')


class BoardRepository{
    create = async ({ userId, title, content, color })=>{
        const { BoardId } = await Boards.create({ title, content, color })
        return await BoardInfo.create({ boardId:BoardId, userId})
    }
}

module.exports = BoardRepository