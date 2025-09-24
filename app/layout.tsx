import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Vocabulary Today - Random Facts",
  description: "Discover fascinating facts from around the world",
    generator: 'v0.app',
    icons: {
      icon: [
        { url: '/vt-logo.png', type: 'image/png' }
      ],
      shortcut: ['/vt-logo.png'],
      apple: ['/vt-logo.png']
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
