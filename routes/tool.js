
const express = require('express');
const router = express.Router();

const tool = require('../remote/tool');

// Get Tools routes
router.get('/', tool.getTools);
router.get('/get', tool.getTools);
// Add Tool route
router.post('/add', tool.addTool);
// Delete Tool route
router.delete('/delete/:id', tool.deleteTool);

module.exports = router;