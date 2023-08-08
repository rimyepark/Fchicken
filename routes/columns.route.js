const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/columns.controller');
const columnController = new ColumnController();
router.get('/column/:ColumnId', columnController .getColumns);//칼럼 조회
router.post('/boders/BoderId', columnController .createColumn);//칼럼 생성
router.put('/column/:ColumnId', columnController .updateColumnName);//칼럼 이름 수정
router.delete('/column/:ColumnId', columnController .deleteColumn);//칼럼 삭제
router.put('/swap-columns/:column1Id/:column2Id', columnController.swapColumns);//칼럼 이동
module.exports = router;