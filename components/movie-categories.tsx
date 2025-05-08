import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function MovieCategories() {
  const categories = [
    { name: "Action", count: 1245 },
    { name: "Comedy", count: 985 },
    { name: "Drama", count: 1876 },
    { name: "Sci-Fi", count: 723 },
    { name: "Horror", count: 651 },
    { name: "Romance", count: 428 },
    { name: "Thriller", count: 872 },
    { name: "Animation", count: 392 },
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
        <Button variant="link" size="sm" className="text-primary">
          View all
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
            <Card className="overflow-hidden transition-colors hover:bg-muted/50">
              <CardContent className="p-6">
                <div className="text-lg font-medium">{category.name}</div>
                <p className="text-sm text-muted-foreground">{category.count} movies</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
