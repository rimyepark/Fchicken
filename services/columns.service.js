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
  //          userId: CreateColumnData.userId, boardId: CreateColumnData.boardId,
  createColumn = async (columnName, columnIndex) => {
    const CreateColumnData = await this.columnRepository.createColumn(columnName, columnIndex);
    if (!CreateColumnData) throw new Error("칼럼을 찾을 수 없습니다.");

    return {
      ColumnId: CreateColumnData.ColumnId,
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

  swapColumns = async (req, res) => {
    const { columnId1, columnId2 } = req.body;
  
    if (!columnId1 || !columnId2) {
      return res.status(400).json({ message: 'Both columnId1 and columnId2 are required.' });
    }
  
    try {
      await this.columnService.swapColumnIndexes(columnId1, columnId2);
      return res.status(200).json({ message: 'Column indexes swapped successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

module.exports = ColumnService;
