"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, TagIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TagsPageClientProps = {
  sortedTags: string[];
  tagCounts: Record<string, number>;
};

export default function TagsPageClient({ sortedTags, tagCounts }: TagsPageClientProps) {
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
            <BreadcrumbLink href="/tags" className="text-muted-foreground">
              {t('nav.tags')}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">{t('tags.allTags')}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-[800px]">{t('tags.browseAll')}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTags.map((tag) => {
          const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
          const count = tagCounts[tag] || 0;

          return (
            <Link key={tag} href={`/tags/${tagSlug}`}>
              <Card className="overflow-hidden border-primary/20 hover:border-primary transition-colors bg-card/80 backdrop-blur-sm h-full">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>{tag}</span>
                    <Badge variant="outline" className="ml-2">
                      {count} {count === 1 ? t('tags.post') : t('tags.posts')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{t('tags.viewPostsTagged', { tag })}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
