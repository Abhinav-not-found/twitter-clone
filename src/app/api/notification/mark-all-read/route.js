import { NextResponse } from "next/server";
import { connect } from "@/database/dbConfig";
import Notification from "@/models/notification.model";

export async function PUT(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await connect();

    await Notification.updateMany(
      { receiverId: userId, seen: false },
      { $set: { seen: true } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
