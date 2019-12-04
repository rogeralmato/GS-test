const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  input: {
    type: String,
    trim: true,
  },
  inputEncryptet: {
    type: String,
    trim: true,
  },
  inputCrc: {
    type: Number
  }
});

module.exports = mongoose.model('Registration', registrationSchema);