const { Boards } = require('../models')
const { Op } = require('sequelize')


class BoardRepository{
    // 보드생성
    create = async ({ title, content, color })=>{
        return await Boards.create({ title, content, color })
    }

    // 보드수정
    update = async (data, target) =>{
        return await Boards.update(data, { where:{[Op.and]:target} } )
    }
}

module.exports = BoardRepository