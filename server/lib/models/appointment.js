const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = { type: String, required: true }

const schema = new Schema({
  type: {
    type: String,
    enum: ['massage', 'movement', 'mineral'],
    required: true
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
});

module.exports = mongoose.model('Appointment', schema);
