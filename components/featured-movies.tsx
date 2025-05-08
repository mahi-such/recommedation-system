import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"

export function FeaturedMovies() {
  // This would typically come from an API
  const featuredMovies = [
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
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Movies</h2>
        <Button variant="link" size="sm" className="text-primary">
          View all
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {featuredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
