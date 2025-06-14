import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'content is required'],
    trim: true,
    maxlength: 280,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'name is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is required'],
    ref: 'User'
  }
}, { timestamps: true })

const Post = mongoose.models.post || mongoose.model('post', postSchema)

export default Post

