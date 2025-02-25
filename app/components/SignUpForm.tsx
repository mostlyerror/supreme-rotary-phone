"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TimezoneSelect from "./TimezoneSelect"
import toast from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

// Move timezone list outside component
const TIMEZONES = Intl.supportedValuesOf('timeZone')

export default function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [notificationTime, setNotificationTime] = useState("21:00")
  const [timezone, setTimezone] = useState("America/Denver")
  const router = useRouter()
  const supabase = createClient()
  
  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, notificationTime, timezone }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Signup error:', result)
        toast.error(result.error)
        return
      }

      console.log('Signup success:', result)
      toast.success('🐮 Moo-velous! You\'re all signed up!')
      
      setPhoneNumber("")
      setNotificationTime("21:00")
      router.refresh()
    } catch (error) {
      console.error('Signup failed:', error)
      toast.error('Unable to complete signup. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Start Your Mood Journey</h2>
      
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-600">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
          required
          placeholder="+1 (555) 555-5555"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="notificationTime" className="block mb-2 text-sm font-medium text-gray-600">
            Daily Check-in Time
          </label>
          <input
            type="time"
            id="notificationTime"
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
            required
          />
        </div>
        
        <div>
          <label htmlFor="timezone" className="block mb-2 text-sm font-medium text-gray-600">
            Time Zone
          </label>
          <TimezoneSelect 
            value={timezone} 
            onChange={setTimezone} 
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Start Tracking
      </button>
    </form>
  )
}

