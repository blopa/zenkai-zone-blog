import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllTags, getTagCounts } from "@/lib/posts"
import { Home, TagIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "All Tags",
  description: "Browse all tags on Zenkai Zone Blog.",
}

export default async function TagsPage() {
  const tags = await getAllTags()
  const tagCounts = await getTagCounts()

  // Sort tags by post count (descending)
  const sortedTags = [...tags].sort((a, b) => {
    const countA = tagCounts[a] || 0
    const countB = tagCounts[b] || 0
    return countB - countA
  })

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
            <BreadcrumbLink href="/tags" className="text-muted-foreground">
              Tags
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">All Tags</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-[800px]">Browse all content tags on Zenkai Zone Blog.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTags.map((tag) => {
          const tagSlug = tag.toLowerCase().replace(/\s+/g, "-")
          const count = tagCounts[tag] || 0

          return (
            <Link key={tag} href={`/tags/${tagSlug}`}>
              <Card className="overflow-hidden border-primary/20 hover:border-primary transition-colors bg-card/80 backdrop-blur-sm h-full">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>{tag}</span>
                    <Badge variant="outline" className="ml-2">
                      {count} {count === 1 ? "post" : "posts"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">View all posts tagged with "{tag}"</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
