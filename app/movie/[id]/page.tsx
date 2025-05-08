"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Star, ThumbsUp, Calendar, Film, ArrowLeft, Check } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MovieCard } from "@/components/movie-card"
import { Search } from "@/components/search"
import { useWatchlist } from "@/context/watchlist-provider"

interface MoviePageProps {
  params: {
    id: string
  }
}

// This would typically come from an API
const moviesData = {
  "1": {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi, Action, Adventure",
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "/placeholder.svg?height=600&width=400",
  },
  "2": {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "Drama",
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "/placeholder.svg?height=600&width=400",
  },
  "3": {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action, Crime, Drama",
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "/placeholder.svg?height=600&width=400",
  },
}

// Similar movies would come from an API
const similarMoviesData = {
  "1": [
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      genre: "Action",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 6,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 7,
      title: "The Matrix",
      year: 1999,
      rating: 8.7,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 8,
      title: "Tenet",
      year: 2020,
      rating: 7.4,
      genre: "Action",
      image: "/placeholder.svg?height=450&width=300",
    },
  ],
  "2": [
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      rating: 8.9,
      genre: "Crime",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 5,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      genre: "Crime",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 10,
      title: "Fight Club",
      year: 1999,
      rating: 8.8,
      genre: "Drama",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 8,
      title: "Forrest Gump",
      year: 1994,
      rating: 8.8,
      genre: "Drama",
      image: "/placeholder.svg?height=450&width=300",
    },
  ],
  "3": [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 6,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 5,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      genre: "Crime",
      image: "/placeholder.svg?height=450&width=300",
    },
    {
      id: 8,
      title: "Tenet",
      year: 2020,
      rating: 7.4,
      genre: "Action",
      image: "/placeholder.svg?height=450&width=300",
    },
  ],
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = Number.parseInt(params.id)
  const [movie, setMovie] = useState(moviesData[params.id] || moviesData["1"])
  const [similarMovies, setSimilarMovies] = useState(similarMoviesData[params.id] || similarMoviesData["1"])

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        genre: movie.genre.split(", ")[0],
        image: movie.image,
      })
    }
  }

  // Simulate fetching movie data based on ID
  useEffect(() => {
    setMovie(moviesData[params.id] || moviesData["1"])
    setSimilarMovies(similarMoviesData[params.id] || similarMoviesData["1"])
  }, [params.id])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">MovieMate</span>
          </Link>
          <div className="flex items-center gap-4">
            <Search />
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
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/watchlist">
              <Film className="mr-2 h-4 w-4" />
              View Watchlist
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-12">
          <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-lg md:sticky md:top-6 md:h-[450px]">
            <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{movie.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{movie.rating}</span>
                  <span className="ml-1">/10</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {movie.duration}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {movie.year}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genre.split(", ").map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-muted-foreground">{movie.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-medium">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="font-medium">Cast</h3>
                <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                Add to Favorites
              </Button>
              <Button
                variant={isInWatchlist(movie.id) ? "default" : "outline"}
                className="gap-2"
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist(movie.id) ? (
                  <>
                    <Check className="h-4 w-4" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Film className="h-4 w-4" />
                    Add to Watchlist
                  </>
                )}
              </Button>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="mb-4 text-xl font-semibold">Similar Movies You Might Like</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {similarMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
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
