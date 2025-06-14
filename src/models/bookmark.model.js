import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:true,
  }
}, { timestamps: true })

bookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Bookmark = mongoose.models.bookmark || mongoose.model('bookmark', bookmarkSchema)

export default Bookmark

