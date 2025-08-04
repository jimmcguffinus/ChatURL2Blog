import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatURL2Blog - Transform ChatGPT URLs into Beautiful Content',
  description: 'Transform public ChatGPT share URLs into clean, beautiful, and shareable blog posts or transcripts.',
  keywords: ['ChatGPT', 'blog', 'transcript', 'content', 'AI', 'conversation'],
  authors: [{ name: 'ChatURL2Blog Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
} 