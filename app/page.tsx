import { Search } from "@/components/search"
import Link from "next/link"
import Image from "next/image"
import { Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedMovies } from "@/components/featured-movies"
import { MovieCategories } from "@/components/movie-categories"

export default function Home() {
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
              <Link href="/watchlist">
                <Film className="mr-2 h-4 w-4" />
                Watchlist
              </Link>
            </Button>
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
        <section className="mb-12">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white md:p-10">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Your Next Favorite Movie
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Get personalized movie recommendations based on your taste and preferences.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:justify-end">
                <div className="relative h-[300px] w-[200px] rotate-3 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Featured movie poster"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative -ml-8 h-[300px] w-[200px] -rotate-6 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Featured movie poster"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedMovies />
        <MovieCategories />
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
