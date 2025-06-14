import { connect } from '@/database/dbConfig'
import User from '@/models/user.model'
import { NextResponse } from 'next/server'
import { getDataFromToken } from '@/utils/getDataFromToken'

connect()
export async function POST(req) {
  const userId = await getDataFromToken(req)
  const user = await User.findOne({ _id: userId }).select('-password')

  return NextResponse.json({
    message: 'User found',
    data: user
  })

}
