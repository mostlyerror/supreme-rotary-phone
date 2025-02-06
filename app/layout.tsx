import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MooMinder',
  description: 'Track your moods with your daily cow companion 🐮',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              Moo<span className="text-4xl">🐮</span><span className="text-purple-500">Minder</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">Daily Emotion Tracker</p>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
