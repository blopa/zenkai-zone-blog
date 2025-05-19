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

import PostsPageClient from './posts-page-client';

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
    <PostsPageClient
      paginatedPosts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
