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
}, { 
  timestamps: true,
    toJSON: {
      transform(doc, obj){
        delete obj.__v
        delete obj._id
        delete obj.createdAt
        delete obj.updatedAt
      }
    }
});

const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;
