"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/posts";

type PostPageClientProps = {
  post: Post;
  categorySlug: string;
  relatedPosts: Post[];
};

export default function PostPageClient({ post, categorySlug, relatedPosts }: PostPageClientProps) {
  const { t } = useTranslation();

  return (
    <article className="container py-8 space-y-8">
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
            <BreadcrumbLink href={`/categories/${categorySlug}`}>{post.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/posts/${post.slug}`} className="text-muted-foreground max-w-[200px] truncate">
              {post.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <div className="space-y-2">
          <Link href={`/categories/${categorySlug}`}>
            <Badge className="hover:bg-primary bg-primary text-primary-foreground">{post.category}</Badge>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        {/* Display the excerpt as a lead paragraph */}
        <p className="lead">{post.excerpt}</p>
        
        {/* Render the HTML content from the markdown file */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          </Link>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">{t('post.relatedPosts')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.slug}
                className="overflow-hidden border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm group"
              >
                <div>
                  <Link href={`/posts/${relatedPost.slug}`} className="block">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardHeader className="p-4">
                    <div className="space-y-2">
                      <Link href={`/categories/${relatedPost.category.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge className="bg-secondary text-background hover:bg-secondary/90">
                          {relatedPost.category}
                        </Badge>
                      </Link>
                      <Link href={`/posts/${relatedPost.slug}`}>
                        <CardTitle className="line-clamp-2 hover:underline">{relatedPost.title}</CardTitle>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">{t('post.sharePost')}</h2>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            Facebook
          </Button>
          <Button variant="outline" size="sm">
            {t('post.copyLink')}
          </Button>
        </div>
      </div>
    </article>
  );
}
