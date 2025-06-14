import { connect } from '@/database/dbConfig'
import User from '@/models/user.model'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

connect()

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(req) {
  try {
    const reqBody = await req.json()

    const parseResult = userSchema.safeParse(reqBody.user)

    if (!parseResult.success) {
      const errors = parseResult.error.format()
      return NextResponse.json({ error: errors }, { status: 400 })
    }

    const { email, password } = parseResult.data

    const checkUser = await User.findOne({ email })
    if (!checkUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const validPassword = await bcrypt.compare(password, checkUser.password)
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }


    const token = jwt.sign({ id: checkUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

    const response = NextResponse.json({
      message: 'Login success',
      success: true,
      userId: checkUser._id
    })
    response.cookies.set('token', token, {
      httpOnly: true
    })

    return response

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
