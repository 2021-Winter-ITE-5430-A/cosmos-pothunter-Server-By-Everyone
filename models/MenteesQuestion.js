const mongoose = require('mongoose');

//schema
const MenteesQuestionSchema = new mongoose.Schema({
    question: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  
  website: {
    type: String,
  }
});

module.exports = mongoose.model('MenteesQuestion', MenteesQuestionSchema);