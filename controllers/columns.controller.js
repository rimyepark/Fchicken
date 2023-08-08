const ColumnService = require('../services/columns.service');

class ColumnController {
    columnService = new ColumnService();
  
    getColumns = async (req, res, next) => {
      try {
        const Columns = await this.columnService.findAllColumn({
          order: [['columnState', 'ASC']]
        });
    
        res.status(200).json({ data: Columns });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    
  
//userId,boardId
    createColumn = async (req, res, next) => {
      try {
        const { columnName,columnState } = req.body;
        const createColumnData = await this.columnService.createColumn(columnName,columnState);
        res.status(201).json({ data: createColumnData });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    updateColumnName = async (req, res, next) => {
        const { ColumnId } = req.params;
        const { columnName } = req.body;
        try {
          const updateColumnName = await this.columnService.updateColumnName(
            columnName
          );
          res.status(200).json({ data: updateColumnName });
        } catch (error) {
          console.error('칼럼 이름을 찾는데 실패하였습니다', error);
          res.status(500).json({ error: '칼럼 이름을 수정하는 것을 실패했습니다.' });
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
  }
  
  
  
  module.exports = ColumnController;