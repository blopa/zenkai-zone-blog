import type { Metadata } from "next"
import { getAllPosts, getAllTags, getCategories } from "@/lib/posts"
import SearchPageClient from "./search-page-client"

export const metadata: Metadata = {
  title: "Search | Zenkai Zone",
  description: "Search for action figure news, reviews, and announcements.",
}

interface SearchPageProps {
  searchParams: {
    q?: string
    page?: string
    category?: string
    tag?: string
    view?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const currentPage = Number(searchParams.page) || 1
  const selectedCategory = searchParams.category || ""
  const selectedTag = searchParams.tag || ""
  const viewMode = searchParams.view || "grid"
  const resultsPerPage = 9

  // Get all posts and filter based on search parameters
  const allPosts = await getAllPosts()
  const categories = await getCategories()
  const tags = await getAllTags()

  // Filter posts based on search query and filters
  const filteredPosts = allPosts.filter((post) => {
    const matchesQuery =
      query === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = selectedCategory === "" || post.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesTag = selectedTag === "" || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())

    return matchesQuery && matchesCategory && matchesTag
  })

  // Calculate pagination
  const totalResults = filteredPosts.length
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const paginatedResults = filteredPosts.slice(startIndex, endIndex)

  // Popular search terms (mocked)
  const popularSearches = ["SH Figuarts Goku", "Figma Link", "MAFEX Batman", "Revoltech Spider-Man", "Dragon Ball"]

  return (
    <SearchPageClient
      query={query}
      currentPage={currentPage}
      selectedCategory={selectedCategory}
      selectedTag={selectedTag}
      viewMode={viewMode}
      totalResults={totalResults}
      totalPages={totalPages}
      paginatedResults={paginatedResults}
      categories={categories}
      tags={tags}
      popularSearches={popularSearches}
    />
  )
}
