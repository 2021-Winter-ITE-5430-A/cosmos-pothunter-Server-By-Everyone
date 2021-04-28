const mongoose = require('mongoose');

//schema
const QASchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
  },
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
  }
});

module.exports = mongoose.model('QA', QASchema);