const mongoose = require('mongoose');

//schema
const FormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  addr1: {
    type: String,
  },
  addr2: {
    type: String,
  },
  email2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  phn: {
    type: String,
  },
  edu: {
    type: String,
  },
  field: {
    type: String,
  },
  gpa: {
    type: String,
  },
  clg: {
    type: String,
  },
  edu2: {
    type: String,
  },
  field2: {
    type: String,
  },
  gpa2: {
    type: String,
  },
  clg2: {
    type: String,
  },
  
});

module.exports = mongoose.model('Form', FormSchema);