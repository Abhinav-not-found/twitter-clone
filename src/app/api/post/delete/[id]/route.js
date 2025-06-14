import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
  try {
    const {id}=params

    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
