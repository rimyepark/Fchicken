const { Columns } = require('../models');

class ColumnRepository {

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
    createColumn = async (columnName,columnState) => {
      const createColumn = await Columns.create({columnName,columnState });
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
  }

  module.exports = ColumnRepository;