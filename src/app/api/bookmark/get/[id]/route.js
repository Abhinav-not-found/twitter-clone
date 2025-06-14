import { connect } from '@/database/dbConfig'
import { NextResponse } from 'next/server'
import Bookmark from '@/models/bookmark.model'
await connect()


export async function GET(req, { params }) {
  try {
    const { id } = await params
    console.log('id: '+id)
    const getBookmarks = await Bookmark.find({ userId: id })
    if (!getBookmarks || getBookmarks.length === 0) {
      return NextResponse.json({ message: 'No bookmarks' })
    }
    return NextResponse.json({ data: getBookmarks })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
