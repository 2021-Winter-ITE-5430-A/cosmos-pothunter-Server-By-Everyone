const mongoose = require('mongoose');

//schema
const FaqsSchema = new mongoose.Schema({
  quesId: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Faqs', FaqsSchema);