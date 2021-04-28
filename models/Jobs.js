const mongoose = require('mongoose');

//schema
const JobsSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  jobid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cmpny: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true
  },
  jd:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Jobs', JobsSchema);