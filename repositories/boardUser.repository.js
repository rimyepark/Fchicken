const { BoardInfos } = require('../models')
const { Op } = require('sequelize')
const { Boards } = require('../models')


class BoardUserRepository{
    // 보드인포 생성
    create = async ({ userId, boardId })=>{
       return await BoardInfos.create({ userId, boardId })
    }

    // 권한 확인용 인포 찾기기능
    findOne = async (target) =>{
        return await BoardInfos.findOne({where:target})
    }

    findAll = async (target) =>{
        return await BoardInfos.findAll({
            where:target,
            include: [
                {
                     model : Boards,
                     attributes:['title', 'createUser','content','color']
                },
            ],
            raw: true,
            nest: true 
        })
    }


}

module.exports = BoardUserRepository