import cron from "node-cron"
import { prisma } from "./prisma"
import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

export function startScheduler() {
  cron.schedule("* * * * *", async () => {
    const currentTime = new Date()
    const hours = currentTime.getHours().toString().padStart(2, "0")
    const minutes = currentTime.getMinutes().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}`

    const users = await prisma.user.findMany({
      where: { notificationTime: timeString },
    })

    for (const user of users) {
      try {
        await client.messages.create({
          body: "How are you feeling today? Reply with one word describing your emotion.",
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: user.phoneNumber,
        })
        console.log(`Sent message to ${user.phoneNumber}`)
      } catch (error) {
        console.error(`Error sending message to ${user.phoneNumber}:`, error)
      }
    }
  })
}

