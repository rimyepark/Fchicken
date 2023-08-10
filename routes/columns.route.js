const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/columns.controller');
const columnController = new ColumnController();
router.get('/columns', columnController .getColumns);//칼럼 조회
router.post('/boards/:boardId/columns', columnController .createColumn);//칼럼 생성
router.put('/columns/:ColumnId', columnController .updateColumnName);//칼럼 이름 수정
router.delete('/columns/:ColumnId', columnController .deleteColumn);//칼럼 삭제
router.put('/swap-columns/:column1Id/:column2Id', columnController.swapColumns);//칼럼 이동
module.exports = router;