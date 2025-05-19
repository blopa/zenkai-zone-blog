import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/posts"
import { ArrowRight, Star, Zap, Flame } from "lucide-react"

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 5)
  const newReleases = posts.filter((post) => post.tags.includes("new-release")).slice(0, 3)

  return (
    <div className="container py-8 space-y-12">
      {/* Hero Section */}
      <section className="space-y-6 py-10 relative overflow-hidden">
        {/* Background elements */}
        <div
          className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/20 blur-xl floating"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-40 w-32 h-32 rounded-full bg-secondary/20 blur-xl floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-accent/20 blur-xl floating"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-center neon-text">
            Your premier source for <span className="text-primary">action figure</span> news
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mt-4 text-center mx-auto">
            The latest reviews, insights, and announcements on high-end action figures including SH Figuarts, Figma, and
            more.
          </p>
          <div className="flex gap-4 mt-6 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Latest Reviews <Star className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              New Releases <Zap className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight gradient-text">
            <Flame className="inline-block mr-2 h-8 w-8" />
            Featured
          </h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-primary/20 animated-border group">
          <div className="relative">
            <Link href={`/posts/${featuredPost.slug}`} className="block">
              <Image
                src={featuredPost.coverImage || "/placeholder.svg"}
                alt={featuredPost.title}
                width={1200}
                height={600}
                className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 space-y-2">
              <Link href={`/categories/${featuredPost.category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 badge-glow-primary">
                  {featuredPost.category}
                </Badge>
              </Link>
              <Link href={`/posts/${featuredPost.slug}`}>
                <h3 className="text-2xl font-bold text-white sm:text-3xl neon-text hover:underline">
                  {featuredPost.title}
                </h3>
              </Link>
              <p className="max-w-[600px] text-white/90">{featuredPost.excerpt}</p>
              <Link href={`/posts/${featuredPost.slug}`}>
                <Button
                  variant="link"
                  className="text-secondary p-0 flex items-center gap-1 hover:text-secondary/90 neon-text-secondary"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-4 relative">
        <div className="absolute -z-10 inset-0 retro-grid opacity-30"></div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight gradient-text">Recent Posts</h2>
          <Link href="/posts">
            <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentPosts.map((post) => (
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
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight gradient-text-reverse">Browse by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/categories/sh-figuarts">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-square">
                <Image src="/placeholder.svg?height=400&width=400" alt="SH Figuarts" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-primary neon-text">SH Figuarts</h3>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/categories/figma">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-square">
                <Image src="/placeholder.svg?height=400&width=400" alt="Figma" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-primary neon-text">Figma</h3>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/categories/mafex">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-square">
                <Image src="/placeholder.svg?height=400&width=400" alt="MAFEX" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-primary neon-text">MAFEX</h3>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/categories/revoltech">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-primary/20 card-hover-effect bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-square">
                <Image src="/placeholder.svg?height=400&width=400" alt="Revoltech" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-primary neon-text">Revoltech</h3>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* New Releases */}
      <section className="space-y-4 py-10 bg-muted/30 -mx-8 px-8 backdrop-blur-sm border-y border-primary/20">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          <Zap className="inline-block mr-2 h-8 w-8" />
          New Releases
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {newReleases.map((post) => (
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
                      <Badge variant="outline" className="border-accent text-accent badge-glow-accent">
                        New Release
                      </Badge>
                      <Link href={`/categories/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge className="bg-secondary text-background hover:bg-secondary/90">{post.category}</Badge>
                      </Link>
                    </div>
                    <Link href={`/posts/${post.slug}`}>
                      <CardTitle className="line-clamp-2 hover:underline">{post.title}</CardTitle>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="rounded-lg bg-muted/30 p-6 md:p-8 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground">
              Get the latest news, reviews, and exclusive content delivered straight to your inbox.
            </p>
          </div>
          <div className="flex items-end">
            <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border border-primary/20 bg-background/60 backdrop-blur-sm px-4 py-2 flex-1 focus:border-secondary focus:outline-none"
                required
              />
              <Button type="submit" className="bg-accent text-background hover:bg-accent/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
