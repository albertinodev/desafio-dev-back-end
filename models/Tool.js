const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;
