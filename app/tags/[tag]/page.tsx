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
  const tagTitle = await params?.tag
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

import TagPageClient from './tag-page-client';

export default async function TagPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  // Convert URL-friendly format back to the tag name format in our data
  const tagParam = await params.tag
  const decodedTagParam = tagParam.replace(/-/g, " ")

  // Get the actual tag name with proper casing
  const tags = await getAllTags()
  const tag = tags.find((t) => t.toLowerCase() === decodedTagParam.toLowerCase())

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
    <TagPageClient
      tagTitle={tagTitle}
      tagParam={tagParam}
      paginatedPosts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
