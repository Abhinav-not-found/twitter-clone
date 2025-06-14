import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['follow', 'like'],
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Notification = mongoose.models.notification || mongoose.model('notification', notificationSchema)

export default Notification

