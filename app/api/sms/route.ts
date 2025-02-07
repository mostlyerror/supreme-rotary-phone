import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import twilio from "twilio"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

export async function POST(req: Request) {
  const { From, Body } = await req.json()

  try {
    // Find user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select()
      .eq('phone_number', From)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create response
    const { data: response, error: responseError } = await supabase
      .from('responses')
      .insert([
        {
          user_id: user.id,
          emotion: Body,
        }
      ])
      .select()
      .single()

    if (responseError) {
      throw responseError
    }

    const message = await client.messages.create({
      body: `Thank you for sharing your emotion: ${Body}. We've recorded your response.`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: From,
    })

    return NextResponse.json({ success: true, response, message: message.sid })
  } catch (error) {
    console.error("Error processing SMS:", error)
    return NextResponse.json({ success: false, error: "Error processing SMS" }, { status: 500 })
  }
}

