const { Boards } = require('../models')


class BoardRepository{
    // 보드생성
    create = async ({ title, content, color })=>{
        return await Boards.create({ title, content, color })
    }
}

module.exports = BoardRepository