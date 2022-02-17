// Importing Tool model
const Tool = require('../models/Tool');

// Get Tool controller
const getTools = async (req, res) => {
    try {
        const results = Tool.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Ocorreu um erro mo servidor." });
    }
}

// Add Tool controller
const addTool = async (req, res) => {
    try {
        const tool = new Tool(req.body);
        const response = await tool.save();
        res.status(200).json({ message : "Tool added!" });   
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Ocorreu um erro mo servidor." });
    }
}

// Delete Tool controller
const deleteTool = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Tool.findByIdAndDelete(id);
        res.status(200).json({ message : "Tool deleted!"}); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Ocorreu um erro ao eliminar a Tool." });
    }
}


module.exports = {
    getTools,
    addTool,
    deleteTool
}