import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { postId } = await params
    const reqBody = await req.json()
    const { userId } = reqBody

    if (!postId || !userId) {
      return NextResponse.json({ message: "Post ID and User ID are required" }, { status: 400 });
    }

    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const hasLiked = post.likes.some(id => id.toString() === userId.toString());

    if (hasLiked) {
      // Unlike 
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    return NextResponse.json({ message: "Post updated", likes: post.likes }, { status: 200 });


  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
