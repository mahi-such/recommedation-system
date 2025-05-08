"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface Movie {
  id: number
  title: string
  year: number
  rating: number
  genre: string
  image: string
}

interface WatchlistContextType {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  clearWatchlist: () => void
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist")
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist))
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
  }, [watchlist, isLoaded])

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((movie) => movie.id === movieId)
  }

  const clearWatchlist = () => {
    setWatchlist([])
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}
