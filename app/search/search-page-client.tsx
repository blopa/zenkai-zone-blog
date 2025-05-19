"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaginationComponent } from "@/components/pagination";
import { Home, SearchIcon, Filter, Tag, Grid3X3, List } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Post } from "@/lib/posts";

type SearchPageClientProps = {
  query: string;
  currentPage: number;
  selectedCategory: string;
  selectedTag: string;
  viewMode: string;
  totalResults: number;
  totalPages: number;
  paginatedResults: Post[];
  categories: string[];
  tags: string[];
  popularSearches: string[];
};

export default function SearchPageClient({
  query,
  currentPage,
  selectedCategory,
  selectedTag,
  viewMode,
  totalResults,
  totalPages,
  paginatedResults,
  categories,
  tags,
  popularSearches,
}: SearchPageClientProps) {
  const { t } = useTranslation();

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1 inline" />
              {t('nav.home')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search" className="text-muted-foreground">
              {t('search.title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search Header */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">{t('search.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-[800px]">
            {t('search.description')}
          </p>
        </div>

        {/* Search Form */}
        <div className="relative">
          <form className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                defaultValue={query}
                placeholder={t('search.inputPlaceholder')}
                className="pl-10 bg-background border-primary/20 focus:border-secondary h-12 text-base"
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 h-12">
              {t('search.button')}
            </Button>
          </form>
        </div>

        {/* Popular Searches */}
        {!query && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">{t('search.popular')}:</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="text-sm text-primary hover:text-primary/80 hover:underline"
              >
                {term}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {query && (
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {totalResults} {totalResults === 1 ? t('search.result') : t('search.results')} {t('search.for')} "{query}"
            </h2>
            <div className="flex items-center gap-2">
              <Link
                href={`/search?q=${query}&view=grid`}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-muted" : ""}`}
              >
                <Grid3X3 className="h-5 w-5" />
                <span className="sr-only">{t('search.gridView')}</span>
              </Link>
              <Link
                href={`/search?q=${query}&view=list`}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-muted" : ""}`}
              >
                <List className="h-5 w-5" />
                <span className="sr-only">{t('search.listView')}</span>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-primary/20 p-4 bg-card/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-5 w-5" /> {t('search.filters')}
              </h3>

              {/* Categories Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-sm text-muted-foreground">{t('nav.categories')}</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory.toLowerCase() === category.toLowerCase()}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground flex items-center">
                  <Tag className="mr-2 h-4 w-4" /> {t('search.popularTags')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${query}&tag=${tag}`}
                      className={`text-xs px-2 py-1 rounded-full border ${
                        selectedTag === tag
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "border-primary/20 hover:border-primary/40"
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedResults.map((post) => (
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
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Link href={`/categories/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
                              <Badge className="bg-secondary text-background hover:bg-secondary/90">
                                {post.category}
                              </Badge>
                            </Link>
                            {post.tags.slice(0, 1).map((tag) => (
                              <Link key={tag} href={`/tags/${tag}`}>
                                <Badge variant="outline" className="border-primary/40 hover:border-primary/60">
                                  {tag}
                                </Badge>
                              </Link>
                            ))}
                          </div>
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
            ) : (
              <div className="space-y-4">
                {paginatedResults.map((post) => (
                  <div
                    key={post.slug}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-colors"
                  >
                    <div className="sm:w-1/4">
                      <Link href={`/posts/${post.slug}`} className="block">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="sm:w-3/4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/categories/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Badge className="bg-secondary text-background hover:bg-secondary/90">{post.category}</Badge>
                        </Link>
                        {post.tags.slice(0, 2).map((tag) => (
                          <Link key={tag} href={`/tags/${tag}`}>
                            <Badge variant="outline" className="border-primary/40 hover:border-primary/60">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                      <Link href={`/posts/${post.slug}`}>
                        <h3 className="text-xl font-bold hover:underline">{post.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      <div className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && paginatedResults.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">{t('search.noResultsTitle')}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t('search.noResultsMessage')}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/search?q=${query}${selectedCategory ? `&category=${selectedCategory}` : ""}${selectedTag ? `&tag=${selectedTag}` : ""}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
