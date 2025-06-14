import { connect } from '@/database/dbConfig'
import { NextResponse } from 'next/server'

connect()

export async function GET(req) {
  try {

    const response = NextResponse.json({
      message: 'logout successful',
      success: true
    })
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0)
    })

    return response

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
