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
  searchParams: { [key: string]: string | string[] | undefined }
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

import CategoryPageClient from './category-page-client';

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  // Convert URL-friendly format back to the category name format in our data
  const categoryParam = params.category
  const decodedCategoryParam = categoryParam.replace(/-/g, " ")

  // Get the actual category name with proper casing
  const categories = await getCategories()
  const category = categories.find((cat) => cat.toLowerCase() === decodedCategoryParam.toLowerCase())

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

  // Pass data to the client component
  return (
    <CategoryPageClient
      categoryTitle={categoryTitle}
      categoryParam={categoryParam}
      paginatedPosts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
