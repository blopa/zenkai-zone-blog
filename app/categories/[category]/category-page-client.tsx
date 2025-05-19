"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationComponent } from "@/components/pagination";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Post } from "@/lib/posts";

type CategoryPageClientProps = {
  categoryTitle: string;
  categoryParam: string;
  paginatedPosts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function CategoryPageClient({
  categoryTitle,
  categoryParam,
  paginatedPosts,
  currentPage,
  totalPages
}: CategoryPageClientProps) {
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
            <BreadcrumbLink href={`/categories/${categoryParam}`} className="text-muted-foreground">
              {categoryTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{categoryTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          {t('categories.browseCollection', { category: categoryTitle })}
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
                      <Badge className="bg-secondary text-background">{post.category}</Badge>
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
            basePath={`/categories/${categoryParam}`}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">{t('categories.noPostsFound')}</h2>
          <p className="text-muted-foreground mt-2">{t('categories.checkBackSoon')}</p>
        </div>
      )}
    </div>
  );
}
