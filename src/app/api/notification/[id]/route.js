import Notification from "@/models/notification.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params
    console.log(id)
    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const findNotification = await Notification.find({ receiverId: id }).sort({ createdAt: -1 });
    return NextResponse.json({ data: findNotification }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
