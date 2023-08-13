const { Boards } = require('../models')
const { Op } = require('sequelize')


class BoardRepository{
    getAll= async (target)=>{
        return await Boards.findAll({
            where:target,
            attributes: ["BoardId", "title", "content", "color", "createUser",]
        })
    }

    get = async (target)=>{
        return await Boards.findOne({where:target})
    }

    // 보드생성
    create = async ({ createUser, title, content, color })=>{
        return await Boards.create({ title, content, createUser, color })
    }

    // 보드수정
    update = async (data, target) =>{
        return await Boards.update(data, { where:{[Op.and]:target} } )
    }

    // 보드삭제
    delete = async (target) => {
        return await Boards.destroy( { where: {[Op.and]: target} } )
    }
}

module.exports = BoardRepository