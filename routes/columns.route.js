const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/columns.controller');
const columnController = new ColumnController();
<<<<<<< HEAD
router.get('/columns', columnController .getColumns);//칼럼 조회
router.post('/boards/:boardId/columns', columnController .createColumn);//칼럼 생성
router.put('/columns/:ColumnId', columnController .updateColumnName);//칼럼 이름 수정
router.delete('/columns/:ColumnId', columnController .deleteColumn);//칼럼 삭제
router.put('/swap-columns/:column1Id/:column2Id', columnController.swapColumns);//칼럼 이동
=======
router.get('/column', columnController .getColumns);
router.post('/column', columnController .createColumn);
router.put('/column/:ColumnId', columnController .updateColumnName);
router.delete('/column/:ColumnId', columnController .deleteColumn);

>>>>>>> c1c05f2a1798374d5e3614f57d5a82134a231c4f
module.exports = router;