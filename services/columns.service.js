const ColumnRepository = require("../repositories/columns.repository");

class ColumnService {
  columnRepository = new ColumnRepository();

  //userId: Column.userId,boardId: Column.boardId,

    findAllColumn = async() => { 
      const allColumn = await this.columnRepository.findAllColumn();
      return allColumn.map(Column => {
        return {
          ColumnId: Column.ColumnId,
          columnName: Column.columnName,
          columnIndex: Column.columnIndex,
          createdAt: Column.createdAt,
          updatedAt: Column.updatedAt,
        }
      });
    }
           
    createColumn = async (boardId, columnName,columnIndex) => {  
      const CreateColumnData = await this.columnRepository.createColumn(boardId, columnName,columnIndex);
      if (!CreateColumnData) throw new Error("칼럼을 찾을 수 없습니다.");
     
      return {
        ColumnId: CreateColumnData.ColumnId,
        boardId: CreateColumnData.boardId,
          columnName: CreateColumnData.columnName,
          columnIndex: CreateColumnData.columnIndex,
      };
    }

    updateColumnName = async ({ColumnId, columnName}) => {
      const findColumn = await this.columnRepository.findColumnById(ColumnId); 
      if (!findColumn) throw new Error("칼럼을 찾지 못하였습니다.");
      await this.columnRepository.updateColumnName(ColumnId, columnName); 
      const updatedColumn = await this.columnRepository.findColumnById(ColumnId);
      return {
        columnName: updatedColumn.columnName, 
      };
    };

  deleteColumn = async (ColumnId) => {
    await this.columnRepository.findColumnById(ColumnId);
    await this.columnRepository.deleteColumn(ColumnId);

    return { code: 200, message: "삭제 완료" };
  };

  swapColumns = async (column1Id, column2Id) => {
    try {
      return await columnRepository.swapColumns(column1Id, column2Id);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ColumnService;
