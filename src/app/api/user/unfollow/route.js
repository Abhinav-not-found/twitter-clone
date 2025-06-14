import { connect } from '@/database/dbConfig'
import User from '@/models/user.model'
import { NextResponse } from 'next/server'

connect()


export async function POST(req) {
  try {
    const reqBody = await req.json()

    const { userId, currentUserId } = reqBody

    const findCurrentUser = await User.findOne({ _id: currentUserId })
    if (!findCurrentUser) {
      return NextResponse.json({ error: 'User Not found' }, { status: 400 })
    }

    if (findCurrentUser.following.includes(userId)) {
      findCurrentUser.following = findCurrentUser.following.filter(
        (id) => id.toString() !== userId
      );
      await findCurrentUser.save();
    }





    const findUser = await User.findOne({ _id: userId })

    if (!findUser) {
      return NextResponse.json({ error: 'User Not found' }, { status: 400 })
    }

    if (findUser.followers.includes(currentUserId)) {
      findUser.followers = findUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
      await findUser.save();
    }

    return NextResponse.json({ message: "UnFollow successful", success: true }, { status: 200 })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
