"use client"

import { useWatchlist } from "@/context/watchlist-provider"
import Link from "next/link"
import { ArrowLeft, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { Search as SearchComponent } from "@/components/search"

export default function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">MovieMate</span>
          </Link>
          <div className="flex items-center gap-4">
            <SearchComponent />
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          {watchlist.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearWatchlist}>
              Clear Watchlist
            </Button>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Watchlist</h1>
          <p className="text-muted-foreground">
            Movies you've saved to watch later. You have {watchlist.length}{" "}
            {watchlist.length === 1 ? "movie" : "movies"} in your watchlist.
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <Film className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies to your watchlist to keep track of what you want to watch.
            </p>
            <Button asChild>
              <Link href="/">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showWatchlistButton />
            ))}
          </div>
        )}
      </main>
      <footer className="border-t bg-muted/40 mt-auto">
        <div className="container flex flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-xl font-bold">
              MovieMate
            </Link>
            <p className="text-sm text-muted-foreground">Your personal movie recommendation engine.</p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
