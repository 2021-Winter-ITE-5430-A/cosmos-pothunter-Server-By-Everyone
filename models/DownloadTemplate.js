const mongoose = require('mongoose');

//schema
const DownloadTemplateSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DownloadTemplate', DownloadTemplateSchema);