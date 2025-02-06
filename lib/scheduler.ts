import cron from "node-cron"
import { createClient } from '@supabase/supabase-js'
import twilio from "twilio"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

export function startScheduler() {
  cron.schedule("* * * * *", async () => {
    const currentTime = new Date()
    const hours = currentTime.getHours().toString().padStart(2, "0")
    const minutes = currentTime.getMinutes().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}`

    const { data: users } = await supabase
      .from('users')
      .select()
      .eq('notification_time', timeString)

    if (!users) return

    for (const user of users) {
      try {
        await client.messages.create({
          body: "How are you feeling today? Reply with one word describing your emotion.",
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: user.phone_number,
        })
        console.log(`Sent message to ${user.phone_number}`)
      } catch (error) {
        console.error(`Error sending message to ${user.phone_number}:`, error)
      }
    }
  })
}

