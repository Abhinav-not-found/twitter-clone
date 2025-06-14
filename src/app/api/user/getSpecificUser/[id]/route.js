import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    const {id}= await params
    console.log(id)

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const findUser = await User.findById(id)
    return NextResponse.json({ data:findUser});

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
