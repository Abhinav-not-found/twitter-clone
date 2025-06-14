import { connect } from '@/database/dbConfig'
import User from '@/models/user.model'
import { NextResponse } from 'next/server'
import Notification from '@/models/notification.model'

connect()


export async function POST(req) {
  try {
    const reqBody = await req.json()

    const { userId, currentUserId } = reqBody

    const findCurrentUser = await User.findOne({ _id: currentUserId })
    if (!findCurrentUser) {
      return NextResponse.json({ error: 'User Not found' }, { status: 400 })
    }

    if (!findCurrentUser.following.includes(userId)) {
      findCurrentUser.following.push(userId)
      await findCurrentUser.save()

      const existingNotification = await Notification.findOne({
        type: 'follow',
        senderId: currentUserId,
        receiverId: userId,
      })

      if (!existingNotification || existingNotification.seen) {
        await Notification.create({
          type: 'follow',
          senderId: currentUserId,
          receiverId: userId,
          seen: false,
          senderName:findCurrentUser.name
        })
      }
    }





    const findUser = await User.findOne({ _id: userId })
    if (!findUser) {
      return NextResponse.json({ error: 'User Not found' }, { status: 400 })
    }
    if (!findUser.followers.includes(currentUserId)) {
      findUser.followers.push(currentUserId)
      await findUser.save()
    }

    return NextResponse.json({ message: "Follow successful", success: true }, { status: 200 })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
