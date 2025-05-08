"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Star, Film, Check } from "lucide-react"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWatchlist, type Movie as MovieType } from "@/context/watchlist-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MovieCardProps {
  movie: MovieType
  showWatchlistButton?: boolean
}

export function MovieCard({ movie, showWatchlistButton = true }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const [isHovering, setIsHovering] = useState(false)

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card
        className="overflow-hidden transition-all hover:scale-[1.02] hover:shadow-md relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          <div className="absolute right-2 top-2">
            <Badge className="bg-black/70 text-white hover:bg-black/70">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </Badge>
          </div>

          {showWatchlistButton && (isHovering || isInWatchlist(movie.id)) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant={isInWatchlist(movie.id) ? "default" : "secondary"}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-90"
                    onClick={handleWatchlistToggle}
                  >
                    {isInWatchlist(movie.id) ? <Check className="h-4 w-4" /> : <Film className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium leading-tight line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
