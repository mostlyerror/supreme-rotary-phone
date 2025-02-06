import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { phoneNumber, notificationTime } = await req.json()

  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          phone_number: phoneNumber,
          notification_time: notificationTime,
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, error: "Error creating user" }, { status: 500 })
  }
}

