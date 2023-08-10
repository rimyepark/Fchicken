const { Columns, sequelize } = require("../models");

class ColumnRepository {
  //칼럼 전체 조회 api
  findAllColumn = async () => {
    const columns = await Columns.findAll();
    return columns;
  };
  //칼럼 조회 api
  findColumnById = async (ColumnId) => {
    const column = await Columns.findByPk(ColumnId);
    return column;
  };
  //칼럼 생성 api userId,boardId,
    createColumn = async (boardId,columnName,columnIndex) => {
      const createColumn = await Columns.create({boardId,columnName,columnIndex });
      return createColumn;
    }
  // 칼럼 이름 수정 api
  updateColumnName = async (ColumnId,columnName) => {
    const updateColumnData = await Columns.update({ columnName }, { where: { ColumnId } });
    return updateColumnData;
  };

    //칼럼 전체 조회 api
    findAllColumn = async () => {
      const columns = await Columns.findAll();
      return columns;
    }
   //칼럼 조회 api
    findColumnById = async (ColumnId) => {
      const column = await Columns.findByPk(ColumnId);
      return column;
    };
  //칼럼 생성 api userId,boardId,
    createColumn = async (columnName,columnIndex) => {
      const createColumn = await Columns.create({columnName,columnIndex });
      return createColumn;
    }
  // 칼럼 이름 수정 api
    updateColumnName = async (ColumnId, columnName) => {
      const updateColumnData = await Columns.update(
        { columnName },
        { where: { ColumnId } }
      );
      return updateColumnData;
    };
  
  // 칼럼 삭제 api
    deleteColumn = async (ColumnId) => {
      const deleteColumnData = await Columns.destroy({ where: { ColumnId } });
      return deleteColumnData;
    };

    swapColumns =  async (column1Id, column2Id) => {
      const transaction = await sequelize.transaction();
  
      try {
        const column1 = await Columns.findByPk(column1Id, { transaction });
        const column2 = await Columns.findByPk(column2Id, { transaction });
  
        const tempcolumnIndex = column1.columnIndex;
        column1.columnIndex = column2.columnIndex;
        column2.columnIndex = tempcolumnIndex;
  
        await column1.save({ transaction });
        await column2.save({ transaction });
  
        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }
  }

  module.exports = ColumnRepository;