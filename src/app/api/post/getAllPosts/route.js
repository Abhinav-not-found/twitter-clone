import { connect } from '@/database/dbConfig'
import Post from '@/models/post.model'
import { NextResponse } from 'next/server'


await connect()


export async function GET() {
  try {
    const allPosts = await Post.find().sort({createdAt:-1})
    return NextResponse.json({ data: allPosts, message: 'Successful' })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
