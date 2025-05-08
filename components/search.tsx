"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SearchIcon, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API or database
const allMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    image: "/placeholder.svg?height=450&width=300",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "Drama",
    image: "/placeholder.svg?height=450&width=300",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    image: "/placeholder.svg?height=450&width=300",
  },
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
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "Drama",
    image: "/placeholder.svg?height=450&width=300",
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    rating: 8.8,
    genre: "Fantasy",
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
]

export function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof allMovies>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filteredMovies = allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.toString().includes(query),
    )
    setSearchResults(filteredMovies)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(!!searchQuery.trim())
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  return (
    <div className="relative w-full max-w-sm">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="w-full rounded-full bg-background pl-8 pr-10 md:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9 rounded-full"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      {searchQuery && searchResults.length > 0 && (
        <Card className="absolute z-50 mt-2 w-full max-h-[70vh] overflow-auto">
          <CardContent className="p-2">
            <div className="text-sm font-medium p-2">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
            </div>
            <div className="space-y-2">
              {searchResults.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={clearSearch}
                >
                  <div className="relative h-12 w-8 flex-shrink-0 overflow-hidden rounded">
                    <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{movie.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{movie.year}</span>
                      <Badge variant="outline" className="text-xs">
                        {movie.genre}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchQuery && searchResults.length === 0 && (
        <Card className="absolute z-50 mt-2 w-full">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No movies found matching &quot;{searchQuery}&quot;</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
