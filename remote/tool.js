// Importing Tool model
const Tool = require('../models/Tool');

// Get Tool controller
const getTools = async (req, res) => {
    try {
        const tag = req.query.tag;
        const results = await Tool.find().sort({ createdAt: -1 });

        if (tag && tag !== "") {
            const finalResp = [];
            results.map(tool => {
                const includes = tool.tags.find(tempTag => tempTag.includes(tag));
                //const includes = tool.tags.includes(tool);
                if (includes) {
                    finalResp.push(tool)
                }
            });

            res.status(200).json(finalResp);
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Ocorreu um erro mo servidor." });
    }
}

// Add Tool controller
const addTool = async (req, res) => {
    try {
        const toolRequest = req.body;
        if (!toolRequest) {
            res.status(401).json({ message : "Nee to send a body request" }); 
        } else {
            const tool = new Tool({ ...toolRequest });
            const newTool = await tool.save();
            res.status(201).json(newTool);   
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Ocorreu um erro mo servidor." });
    }
}


// Delete Tool controller
const deleteTool = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Tool.findOneAndDelete({ _id: id });
        res.status(204).json({ message : "No Content"}); 
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