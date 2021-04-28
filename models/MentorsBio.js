const mongoose = require('mongoose');

//schema
const MentorsBioSchema = new mongoose.Schema({
  mentorsName: {
    type: String,
    required: true,
  },

  mentorsProf: {
    type: String,
  },
  
  mentorsLinkedInUrl: {
    type: String,
  },

  imageUrl:{
    type: String,
  },

  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
  }
});

module.exports = mongoose.model('mentorBio', MentorsBioSchema);