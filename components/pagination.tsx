"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function PaginationComponent({ currentPage, totalPages, basePath }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Function to generate page URL
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath
    }
    return `${basePath}?page=${page}`
  }

  // Determine which page numbers to show
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    // Deduplicate and sort
    return [...new Set(pages)].sort((a, b) => a - b)
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-2 py-8">
      {/* Previous page button */}
      {currentPage > 1 ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, i) => {
        // Add ellipsis if there's a gap
        const previousPage = pageNumbers[i - 1]
        if (previousPage && page - previousPage > 1) {
          return (
            <div key={`ellipsis-${page}`} className="flex items-center">
              <Button variant="outline" size="icon" disabled>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </Button>
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                asChild={currentPage !== page}
              >
                {currentPage !== page ? <Link href={getPageUrl(page)}>{page}</Link> : <span>{page}</span>}
              </Button>
            </div>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? <Link href={getPageUrl(page)}>{page}</Link> : <span>{page}</span>}
          </Button>
        )
      })}

      {/* Next page button */}
      {currentPage < totalPages ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={getPageUrl(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      )}
    </div>
  )
}
