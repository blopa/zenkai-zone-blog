import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/posts"
import { Calendar, User, Tag, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-")
  const relatedPosts = await getRelatedPosts(post, 3)

  return (
    <article className="container py-8 space-y-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1 inline" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
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
        {/* In a real app, this would be rendered markdown/MDX content */}
        <p className="lead">{post.excerpt}</p>
        <p>
          This is where the full content of the blog post would be displayed. In a real application, this would likely
          be rendered from Markdown or MDX content stored in files or fetched from a CMS.
        </p>
        <p>
          For this example, we're using placeholder content, but in a production blog, you would have detailed reviews,
          specifications, comparisons, and high-quality images of the action figures.
        </p>
        <h2>Product Details</h2>
        <p>
          The SH Figuarts line is known for its exceptional articulation and screen-accurate detailing. This figure
          continues that tradition with over 30 points of articulation and a variety of interchangeable parts.
        </p>
        <h3>What's in the box:</h3>
        <ul>
          <li>Main figure</li>
          <li>3 pairs of interchangeable hands</li>
          <li>2 interchangeable face plates</li>
          <li>Special effect parts</li>
          <li>Display stand</li>
        </ul>
        <h2>Articulation and Posability</h2>
        <p>
          One of the standout features of this figure is the range of motion in the joints. The shoulders, elbows, and
          knees all have an excellent range that allows for dynamic posing.
        </p>
        <h2>Paint and Sculpt</h2>
        <p>
          The sculpt is highly detailed and the paint application is clean and precise. The face sculpt in particular
          captures the character's likeness perfectly.
        </p>
        <h2>Final Thoughts</h2>
        <p>
          Overall, this is an excellent addition to any action figure collection. The combination of screen accuracy,
          articulation, and included accessories makes this a must-have for fans of the character.
        </p>
        <h3>Pros:</h3>
        <ul>
          <li>Excellent articulation</li>
          <li>Screen-accurate detailing</li>
          <li>High-quality materials</li>
          <li>Great selection of accessories</li>
        </ul>
        <h3>Cons:</h3>
        <ul>
          <li>Price point may be high for some collectors</li>
          <li>Some small parts could be easily lost</li>
        </ul>
        <p>
          <strong>Rating: 9/10</strong> - A near-perfect figure with only minor issues that don't detract from the
          overall quality.
        </p>
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
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
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
        <h2 className="text-2xl font-bold mb-4">Share this post</h2>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            Facebook
          </Button>
          <Button variant="outline" size="sm">
            Copy Link
          </Button>
        </div>
      </div>
    </article>
  )
}
