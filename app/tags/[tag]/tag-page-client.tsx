"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaginationComponent } from "@/components/pagination";
import { Home, TagIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Post } from "@/lib/posts";

type TagPageClientProps = {
  tagTitle: string;
  tagParam: string;
  paginatedPosts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function TagPageClient({
  tagTitle,
  tagParam,
  paginatedPosts,
  currentPage,
  totalPages
}: TagPageClientProps) {
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
            <BreadcrumbLink href="/posts">{t('nav.posts')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tags">{t('nav.tags')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/tags/${tagParam}`} className="text-muted-foreground">
              {tagTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            {t('tag.postsTagged', { tag: tagTitle })}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          {t('tag.browsePostsTagged', { tag: tagTitle })}
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
                    <div className="space-y-3">
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

          <PaginationComponent 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath={`/tags/${tagParam}`} 
          />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">{t('tag.noPostsFound')}</h2>
          <p className="text-muted-foreground mt-2">{t('tag.checkBackSoon')}</p>
          <Button asChild className="mt-4">
            <Link href="/posts">{t('tag.browseAllPosts')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
