import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)  // Use the server client with cookies

    // Validate request body
    const body = await req.json()
    console.log('Received signup request:', body)

    const { phoneNumber, notificationTime, timezone } = body

    if (!phoneNumber || !notificationTime || !timezone) {
      console.error('Missing required fields:', { phoneNumber, notificationTime, timezone })
      return NextResponse.json(
        { success: false, error: "Phone number, notification time, and timezone are required" },
        { status: 400 }
      )
    }

    // Validate phone number format (basic check)
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      console.error('Invalid phone number format:', phoneNumber)
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Validate time format (HH:mm)
    if (!notificationTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      console.error('Invalid time format:', notificationTime)
      return NextResponse.json(
        { success: false, error: "Invalid time format" },
        { status: 400 }
      )
    }

    // Check if Supabase connection is working
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { success: false, error: "Database configuration error" },
        { status: 500 }
      )
    }

    console.log('Attempting to create user in Supabase')
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          phone_number: phoneNumber,
          notification_time: notificationTime,
          timezone: timezone
        }
      ])
      .select()
      .single()

    if (error) {
      // Handle unique constraint violation
      if (error.code === '23505') {
        console.warn(`Duplicate phone number attempted: ${phoneNumber}`, {
          error: error,
          details: error.details,
          hint: error.hint
        })
        return NextResponse.json(
          { 
            success: false, 
            error: "This phone number is already registered",
            details: {
              code: error.code,
              message: error.message
            }
          },
          { status: 400 }
        )
      }

      // Log other database errors
      console.error('Database error during user creation:', {
        error: error,
        code: error.code,
        details: error.details,
        hint: error.hint,
        message: error.message
      })

      return NextResponse.json(
        { 
          success: false, 
          error: "Database error during user creation",
          details: {
            code: error.code,
            message: error.message
          }
        },
        { status: 500 }
      )
    }

    console.log(`Successfully created user:`, user)
    return NextResponse.json({ 
      success: true, 
      user,
      message: "User created successfully" 
    })

  } catch (error) {
    console.error("Unexpected error during signup:", {
      error,
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json(
      { 
        success: false, 
        error: "Unexpected error during signup",
        details: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

