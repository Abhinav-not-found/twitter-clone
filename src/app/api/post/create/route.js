import { connect } from '@/database/dbConfig'
import Post from '@/models/post.model'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import User from '@/models/user.model'

await connect()

const postSchema = z.object({
  content: z.string().trim().max(280, 'Content max length is 280 characters'),
  userId: z.string(),
})

export async function POST(req) {
  try {
    const reqBody = await req.json()

    const parseResult = postSchema.safeParse(reqBody)

    if (!parseResult.success) {
      const errors = parseResult.error.format()
      return NextResponse.json({ error: errors }, { status: 400 })
    }

    const { content, userId } = parseResult.data

    const findUser = await User.findById(userId).lean()
    if(!findUser){
      return NextResponse.json({message:"Couldn't find user"},{status:400})
    }

    const newPost = new Post({ content, userId, name:findUser.name, email:findUser.email })
    await newPost.save()
    return NextResponse.json({ post: newPost, message:'Post created successfully!' }, { status: 201 })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
