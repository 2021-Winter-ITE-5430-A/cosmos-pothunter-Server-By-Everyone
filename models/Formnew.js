const mongoose = require('mongoose');

const FormNewSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addr1: {
    type: String,
  },
  addr2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
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
  exp1: {
    type: String,
  },


});

module.exports = mongoose.model('Formnew', FormNewSchema);