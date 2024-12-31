const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  category: { type: String, required: true },
  saveAs: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
