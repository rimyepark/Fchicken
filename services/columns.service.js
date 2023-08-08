const ColumnRepository = require('../repositories/columns.repository');

class ColumnService {

    columnRepository = new ColumnRepository();

    //userId: Column.userId,boardId: Column.boardId,
  

    findAllColumn = async() => { 
      const allColumn = await this.columnRepository.findAllColumn();
      return allColumn.map(Column => {
        return {
          ColumnId: Column.ColumnId,
          columnName: Column.columnName,
          columnState: Column.columnState,
          createdAt: Column.createdAt,
          updatedAt: Column.updatedAt,
        }
      });
    }
  //          userId: CreateColumnData.userId, boardId: CreateColumnData.boardId,
    createColumn = async (columnName,columnState) => {  
      const CreateColumnData = await this.columnRepository.createColumn(columnName,columnState);
      if (!CreateColumnData) throw new Error("칼럼을 찾을 수 없습니다.");
     
      return {
        ColumnId: CreateColumnData.ColumnId,
          columnName: CreateColumnData.columnName,
          columnState: CreateColumnData.columnState,
      };
    }
  
    updateColumnName = async (columnName) => {
      const findColumn = await this.columnRepository.findColumnById(ColumnId);
      if (!findColumn) throw new Error("칼럼을 찾지 못하였습니다.");

      await this.columnRepository.updateColumn(columnName);
      
      const updateColumnName = await this.columnRepository.findColumnById(ColumnId);
      return {
        CcolumnName: updateColumnName.columnName,
      };
    };
  
    deleteColumn = async (ColumnId) => {
      await this.columnRepository.findColumnCById(ColumnId);
      await this.columnRepository.deleteColumn(ColumnId);
      
      return true
    };
  }
  
  
  
  module.exports = ColumnService;