const express = require('express');
const router = express.Router();

const boardRouter = require('./board.route')

router.use('/',boardRouter,);

module.exports = router;