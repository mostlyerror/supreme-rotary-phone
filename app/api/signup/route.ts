import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { phoneNumber, notificationTime } = await req.json()

  try {
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        notificationTime,
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, error: "Error creating user" }, { status: 500 })
  }
}

