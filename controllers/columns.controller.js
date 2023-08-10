const ColumnService = require("../services/columns.service");

class ColumnController {
    columnService = new ColumnService();
  
    getColumns = async (req, res, next) => {
      try {
        const Columns = await this.columnService.findAllColumn({
          order: [['columnIndex', 'ASC']]
        });
    
        res.status(200).json({ data: Columns });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    

    createColumn = async (req, res, next) => {
      try {
        const { boardId } = req.params;
        const { columnName, columnIndex } = req.body;
        const createColumnData = await this.columnService.createColumn( boardId, columnName, columnIndex);
        res.status(201).json({ data: createColumnData });
      } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
      }
    };

    updateColumnName = async (req, res, next) => {
      const { ColumnId } = req.params;
      const { columnName } = req.body;
      try {
        const updatedColumn = await this.columnService.updateColumnName({ ColumnId, columnName }); // Pass parameters as an object
        res.status(200).json({ data: updatedColumn });
      } catch (error) {
        console.error("칼럼 이름을 찾는데 실패하였습니다", error);
        res.status(500).json({ error: "칼럼 이름을 수정하는 것을 실패했습니다." });
      }
    };
    

  deleteColumn = async (req, res, next) => {
    try {
      const { ColumnId } = req.params;
      const result = await this.columnService.deleteColumn(ColumnId);
      res.status(result.code).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  swapColumns = async (req, res, next) => {
    const { column1Id, column2Id } = req.params;

    try {
      await columnService.swapColumns(column1Id, column2Id);
      res.status(200).json({ message: "Columns swapped successfully." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ColumnController;
