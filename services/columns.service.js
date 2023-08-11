const ColumnRepository = require("../repositories/columns.repository");

class ColumnService {
  columnRepository = new ColumnRepository();

  //userId: Column.userId,boardId: Column.boardId,

  findAllColumn = async () => {
    const allColumn = await this.columnRepository.findAllColumn();
    return allColumn.map((Column) => {
      return {
        ColumnId: Column.ColumnId,
        columnName: Column.columnName,
        columnIndex: Column.columnIndex,
        createdAt: Column.createdAt,
        updatedAt: Column.updatedAt,
      };
    });
  };

  createColumn = async (boardId, columnName, columnIndex) => {
    const CreateColumnData = await this.columnRepository.createColumn(boardId, columnName, columnIndex);
    if (!CreateColumnData) throw new Error("칼럼을 찾을 수 없습니다.");

    return {
      ColumnId: CreateColumnData.ColumnId,
      boardId: CreateColumnData.boardId,
      columnName: CreateColumnData.columnName,
      columnIndex: CreateColumnData.columnIndex,
    };
  };

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

    return true;
  };

<<<<<<< HEAD
  swapColumnIndexes = async (columnId1, columnId2) => {
=======
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

    return true;
  };

  swapColumns = async (column1Id, column2Id) => {
>>>>>>> 607a2e0b4f011465e55338bb6681490fe121c93f
    try {
      const column1 = await this.columnRepository.findColumnById(columnId1);
      const column2 = await this.columnRepository.findColumnById(columnId2);

      const tempIndex = column1.columnIndex;
      column1.columnIndex = column2.columnIndex;
      column2.columnIndex = tempIndex;

      await this.columnRepository.updateColumn(column1);
      await this.columnRepository.updateColumn(column2);

      console.log("Column indexes swapped successfully.");
    } catch (error) {
      console.error("Error swapping column indexes:", error);
      throw error;
    }
  };
}

module.exports = ColumnService;
