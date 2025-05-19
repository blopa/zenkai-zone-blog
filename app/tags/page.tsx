import type { Metadata } from "next"
import { getAllTags, getTagCounts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "All Tags",
  description: "Browse all tags on Zenkai Zone Blog.",
}

import TagsPageClient from './tags-page-client';

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
    <TagsPageClient 
      sortedTags={sortedTags}
      tagCounts={tagCounts}
    />
  )
}
