import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

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
            <p className="mt-2 text-lg text-gray-600">Daily emotion tracker: Mind your moooood.</p>
          </div>
          {children}
          <Toaster position="top-center" />
          <footer className="text-center mt-12 text-sm text-gray-500">
            <a 
              href="https://github.com/mostlyerror" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-500 transition-colors"
            >
              Made with ❤️ by mostlyerror
            </a>
          </footer>
        </main>
      </body>
    </html>
  )
}
