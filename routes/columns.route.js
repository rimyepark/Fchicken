const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/columns.controller');
const columnController = new ColumnController();
router.get('/column', columnController .getColumns);
router.post('/column', columnController .createColumn);
router.put('/column/:ColumnId', columnController .updateColumnName);
router.delete('/column/:ColumnId', columnController .deleteColumn);

module.exports = router;