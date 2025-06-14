import { connect } from '@/database/dbConfig';
import { NextResponse } from 'next/server';
import Bookmark from '@/models/bookmark.model';

await connect();

export async function POST(req) {
  try {
    const { userId, postId } = await req.json();

    const existingBookmark = await Bookmark.findOne({ userId, postId });

    if (existingBookmark) {
      return NextResponse.json({ message: 'Already bookmarked' }, { status: 200 });
    }

    await Bookmark.create({ userId, postId });

    return NextResponse.json({ message: 'Bookmark saved successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
