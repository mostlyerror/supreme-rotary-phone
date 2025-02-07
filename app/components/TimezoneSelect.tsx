'use client'

import { useClientMount } from '../hooks/useClientMount'

const TIMEZONES = Intl.supportedValuesOf('timeZone')

export default function TimezoneSelect({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (value: string) => void 
}) {
  const mounted = useClientMount()

  if (!mounted) {
    return (
      <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all">
        <option>{value}</option>
      </select>
    )
  }

  return (
    <select
      id="timezone"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
      required
    >
      {TIMEZONES.map((tz) => (
        <option key={tz} value={tz}>
          {tz.replace(/_/g, ' ')}
        </option>
      ))}
    </select>
  )
} 