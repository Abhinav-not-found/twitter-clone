import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    const {id}= await params

    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const findPost = await Post.findById(id)
    return NextResponse.json({ data:findPost});

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
