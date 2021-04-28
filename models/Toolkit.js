const mongoose = require('mongoose');

//schema
const ToolkitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },name: {
    type: String,
    required: true,
  },
  webPreviewUrl: {
    type: String,
  }
});

module.exports = mongoose.model('InterviewToolkit', ToolkitSchema);