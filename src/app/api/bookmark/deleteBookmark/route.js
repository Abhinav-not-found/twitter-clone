import Bookmark from "@/models/bookmark.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, postId } = await req.json();

    const deleted = await Bookmark.findOneAndDelete({ userId, postId });

    if (!deleted) {
      return NextResponse.json({ message: "Bookmark not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bookmark deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
