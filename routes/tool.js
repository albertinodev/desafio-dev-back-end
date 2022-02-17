
const express = require('express');
const router = express.Router();

const tool = require('../remote/tool');

// Get Tools routes
router.get('/', tool.getTools);
router.get('/tools', tool.getTools);
// Add Tool route
router.post('/tools', tool.addTool);
// Delete Tool route
router.delete('/tools/:id', tool.deleteTool);

module.exports = router;