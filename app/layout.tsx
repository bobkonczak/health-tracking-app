import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Tracking App',
  description: 'Track your daily health habits and progress',
  manifest: '/manifest.json',
  themeColor: '#8b5cf6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Health Tracker" />
      </head>
      <body>{children}</body>
    </html>
  )
}
