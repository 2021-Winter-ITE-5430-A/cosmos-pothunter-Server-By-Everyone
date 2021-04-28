const mongoose = require('mongoose');

//schema
const MentorSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
  
  details: {
    type: String,
  }
});

module.exports = mongoose.model('Mentor', MentorSchema);