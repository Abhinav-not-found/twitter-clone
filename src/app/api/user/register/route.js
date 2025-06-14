import { connect } from '@/database/dbConfig'
import User from '@/models/user.model'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

connect()

const userSchema = z.object ({
  name: z.string().min(1,'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6,'Password must be at least 6 characters'),
})

export async function POST(req) {
  try {
    const reqBody = await req.json()

    const parseResult = userSchema.safeParse(reqBody.user)
    if (!parseResult.success) {
      const errors = parseResult.error.format()
      return NextResponse.json({ error: errors }, { status: 400 })
    }

    const { email, password, name } = parseResult.data

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({
        message: 'User Already exist!'
      }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email, password: hashedPassword, name
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    return NextResponse.json({
      message: 'User registered successfully',
      success: true,
      savedUser
    })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
