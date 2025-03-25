const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Only for child accounts
  deviceToken: { type: String }, // For FCM notifications
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);