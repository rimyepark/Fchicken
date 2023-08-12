const { Boards } = require('../models')
const { Op } = require('sequelize')


class BoardRepository{
    // 보드생성
    create = async ({ createUser, title, content, color })=>{
        const NcreateUser = Number(createUser)
        return await Boards.create({ title, content, createUser:NcreateUser, color })
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