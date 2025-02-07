import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { phoneNumber, notificationTime, timezone } = await request.json()

    // Check if phone number already exists
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select()
      .eq('phone_number', phoneNumber)
      .single()

    if (selectError && selectError.code !== 'PGRST116') { // Ignore "no rows returned" error
      console.error('Select error:', selectError)
      return NextResponse.json(
        { error: "Error checking existing user" },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "🐮 Moo-ps! This phone number is already registered" },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ 
        phone_number: phoneNumber, 
        notification_time: notificationTime,
        timezone: timezone 
      }])

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: `🐮 Moo-no! ${insertError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Success" })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: "🐮 Holy cow! An unexpected error occurred" },
      { status: 500 }
    )
  }
}

