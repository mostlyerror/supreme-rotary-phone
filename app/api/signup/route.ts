import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const { phoneNumber, notificationTime, timezone } = await request.json()

    // Check if phone number already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('phone_number', phoneNumber)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: "🐮 Moo-ps! This phone number is already registered" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('users')
      .insert([{ 
        phone_number: phoneNumber, 
        notification_time: notificationTime,
        timezone: timezone 
      }])

    if (error) {
      return NextResponse.json(
        { error: "🐮 Moo-no! Something went wrong while signing up" },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Success" })
  } catch (error) {
    return NextResponse.json(
      { error: "🐮 Holy cow! An unexpected error occurred" },
      { status: 500 }
    )
  }
}

