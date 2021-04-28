const mongoose = require('mongoose');

//schema
const WordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  term: {
    type: String,
  },
  sentence: {
    type: String,
  },
});

module.exports = mongoose.model('Word', WordSchema);