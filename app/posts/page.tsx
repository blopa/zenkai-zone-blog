import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/posts"
import { PaginationComponent } from "@/components/pagination"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all our action figure news, reviews, and announcements.",
}

interface PostsPageProps {
  searchParams: {
    page?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  const posts = await getAllPosts()

  // Calculate pagination
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

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
            <BreadcrumbLink href="/posts" className="text-muted-foreground">
              Posts
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">All Posts</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Browse all our action figure news, reviews, and announcements.
        </p>
      </div>

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
                  <Link href={`/categories/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Badge className="bg-secondary text-background hover:bg-secondary/90">{post.category}</Badge>
                  </Link>
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

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} basePath="/posts" />
    </div>
  )
}
