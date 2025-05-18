import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPostsByTag, getAllTags } from "@/lib/posts"
import { PaginationComponent } from "@/components/pagination"
import { Home, TagIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props = {
  params: {
    tag: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Convert kebab-case to readable format
  const tagTitle = params.tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `Posts Tagged with "${tagTitle}"`,
    description: `Browse all posts tagged with ${tagTitle} on Zenkai Zone Blog.`,
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()

  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function TagPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  // Convert URL-friendly format back to the tag name format in our data
  const tagParam = params.tag.replace(/-/g, " ")

  // Get the actual tag name with proper casing
  const tags = await getAllTags()
  const tag = tags.find((t) => t.toLowerCase() === tagParam.toLowerCase())

  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTag(tag)

  // Calculate pagination
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  // Convert tag to title case for display
  const tagTitle = tag
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
            <BreadcrumbLink href="/tags">Tags</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/tags/${params.tag}`} className="text-muted-foreground">
              {tagTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Posts Tagged: {tagTitle}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Browse all posts tagged with "{tagTitle}" on Zenkai Zone Blog.
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

          <PaginationComponent currentPage={currentPage} totalPages={totalPages} basePath={`/tags/${params.tag}`} />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">No posts found with this tag</h2>
          <p className="text-muted-foreground mt-2">Check back soon for new content!</p>
          <Button asChild className="mt-4">
            <Link href="/posts">Browse All Posts</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
