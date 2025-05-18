import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostsByCategory, getCategories } from "@/lib/posts"
import { PaginationComponent } from "@/components/pagination"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props = {
  params: {
    category: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Convert kebab-case to title case for display
  const categoryTitle = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${categoryTitle} Action Figures`,
    description: `Browse our collection of ${categoryTitle} action figure news, reviews, and announcements.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  // Convert URL-friendly format back to the category name format in our data
  const categoryParam = params.category.replace(/-/g, " ")

  // Get the actual category name with proper casing
  const categories = await getCategories()
  const category = categories.find((cat) => cat.toLowerCase() === categoryParam.toLowerCase())

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category)

  // Calculate pagination
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  // Convert category to title case for display
  const categoryTitle = category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1 inline" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${params.category}`} className="text-muted-foreground">
              {categoryTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{categoryTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Browse our collection of {categoryTitle} action figure news, reviews, and announcements.
        </p>
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm group"
              >
                <div>
                  <Link href={`/posts/${post.slug}`} className="block">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardHeader className="p-4">
                    <div className="space-y-2">
                      <Badge className="bg-secondary text-background">{post.category}</Badge>
                      <Link href={`/posts/${post.slug}`}>
                        <CardTitle className="line-clamp-2 hover:underline">{post.title}</CardTitle>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/categories/${params.category}`}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">No posts found in this category</h2>
          <p className="text-muted-foreground mt-2">Check back soon for new content!</p>
        </div>
      )}
    </div>
  )
}
