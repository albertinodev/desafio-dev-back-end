
const express = require('express');
const router = express.Router();

const tool = require('../remote/tool');

// All Tool routes
router.get('/get', tool.getTools);
router.post('/add', tool.addTool);
router.post('/delete', tool.deleteTool);

module.exports = router;