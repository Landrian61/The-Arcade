import type { Metadata } from 'next'
import ThemeRegistry from '@/theme/registry'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Arcade - Frontend Playground',
  description: 'A shared sandbox for the frontend team to experiment and create',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}







