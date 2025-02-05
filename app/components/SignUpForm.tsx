"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [notificationTime, setNotificationTime] = useState("21:00")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, notificationTime }),
    })
    if (res.ok) {
      router.refresh()
    } else {
      alert("Error signing up")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-2">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="notificationTime" className="block mb-2">
          Notification Time:
        </label>
        <input
          type="time"
          id="notificationTime"
          value={notificationTime}
          onChange={(e) => setNotificationTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  )
}

