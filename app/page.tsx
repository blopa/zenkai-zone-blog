import { getAllPosts } from "@/lib/posts"
import HomePageClient from "./home-page-client"

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 5)
  const newReleases = posts.filter((post) => post.tags.includes("new-release")).slice(0, 3)

  return (
    <HomePageClient
      featuredPost={featuredPost}
      recentPosts={recentPosts}
      newReleases={newReleases}
    />
  )
}
