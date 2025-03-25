const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appUsage: [{
    appName: String,
    duration: Number, // in minutes
  }],
  callLogs: [{
    number: String,
    duration: Number,
    type: { type: String, enum: ['incoming', 'outgoing', 'missed'] },
  }],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);