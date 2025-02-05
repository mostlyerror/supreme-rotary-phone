import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

export async function POST(req: Request) {
  const { From, Body } = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: From },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const response = await prisma.response.create({
      data: {
        userId: user.id,
        emotion: Body,
      },
    })

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

