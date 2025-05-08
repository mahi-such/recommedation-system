import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { WatchlistProvider } from "@/context/watchlist-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MovieMate - Your Personal Movie Recommendation Engine",
  description: "Discover your next favorite movie with personalized recommendations.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WatchlistProvider>{children}</WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
