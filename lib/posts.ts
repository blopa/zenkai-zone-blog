// This is a mock implementation that would be replaced with actual data fetching
// from a CMS, markdown files, or other data source in a real application

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    picture: string
  }
}

const posts: Post[] = [
  {
    slug: "sh-figuarts-goku-ultra-instinct-review",
    title: "SH Figuarts Dragon Ball Super Son Goku Ultra Instinct Review",
    date: "2023-05-15",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "An in-depth look at the latest Ultra Instinct Goku figure from Bandai's premium SH Figuarts line.",
    content: "Full review content would go here...",
    category: "SH Figuarts",
    tags: ["dragon ball", "review", "sh figuarts"],
    author: {
      name: "John Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "figma-link-breath-of-the-wild-announcement",
    title: "Good Smile Announces New Figma Link from Breath of the Wild",
    date: "2023-05-10",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Good Smile Company reveals a new Figma figure of Link based on The Legend of Zelda: Breath of the Wild.",
    content: "Full announcement content would go here...",
    category: "Figma",
    tags: ["zelda", "new-release", "figma", "good smile company"],
    author: {
      name: "Sarah Reviewer",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "mafex-batman-hush-black-version-review",
    title: "MAFEX Batman (Hush) Black Version Review",
    date: "2023-05-05",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "We take a detailed look at Medicom's latest Batman figure from the popular Hush storyline.",
    content: "Full review content would go here...",
    category: "MAFEX",
    tags: ["batman", "dc comics", "review", "mafex"],
    author: {
      name: "Mike Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "revoltech-deadpool-review",
    title: "Amazing Yamaguchi Revoltech Deadpool Review",
    date: "2023-04-28",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Is this the most posable Deadpool figure ever made? We find out in our comprehensive review.",
    content: "Full review content would go here...",
    category: "Revoltech",
    tags: ["marvel", "deadpool", "review", "revoltech"],
    author: {
      name: "John Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "sh-figuarts-demon-slayer-nezuko-announced",
    title: "Bandai Announces SH Figuarts Nezuko from Demon Slayer",
    date: "2023-04-20",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Bandai expands their Demon Slayer lineup with a highly articulated Nezuko figure.",
    content: "Full announcement content would go here...",
    category: "SH Figuarts",
    tags: ["demon slayer", "anime", "new-release", "sh figuarts"],
    author: {
      name: "Sarah Reviewer",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "figma-spider-man-no-way-home-review",
    title: "Figma Spider-Man (No Way Home Version) Review",
    date: "2023-04-15",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Good Smile Company's take on the integrated suit from Spider-Man: No Way Home is here, and it's impressive.",
    content: "Full review content would go here...",
    category: "Figma",
    tags: ["spider-man", "marvel", "review", "figma"],
    author: {
      name: "Mike Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "mafex-the-batman-2022-announced",
    title: "MAFEX Reveals The Batman (2022) Figure",
    date: "2023-04-10",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Medicom unveils their upcoming figure based on Robert Pattinson's portrayal of the Dark Knight.",
    content: "Full announcement content would go here...",
    category: "MAFEX",
    tags: ["batman", "dc comics", "new-release", "mafex"],
    author: {
      name: "John Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "revoltech-all-might-my-hero-academia-review",
    title: "Amazing Yamaguchi Revoltech All Might Review",
    date: "2023-04-05",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "The Symbol of Peace gets the Revoltech treatment. Does this figure do the character justice?",
    content: "Full review content would go here...",
    category: "Revoltech",
    tags: ["my hero academia", "anime", "review", "revoltech"],
    author: {
      name: "Sarah Reviewer",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "sh-figuarts-mandalorian-beskar-armor-review",
    title: "SH Figuarts The Mandalorian (Beskar Armor) Review",
    date: "2023-03-28",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Bandai's premium take on Din Djarin in his iconic Beskar armor is a must-have for Star Wars collectors.",
    content: "Full review content would go here...",
    category: "SH Figuarts",
    tags: ["star wars", "mandalorian", "review", "sh figuarts"],
    author: {
      name: "Mike Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "figma-demon-slayer-tanjiro-review",
    title: "Figma Demon Slayer: Tanjiro Kamado Review",
    date: "2023-03-20",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Good Smile Company's Tanjiro figure captures the essence of the Demon Slayer protagonist perfectly.",
    content: "Full review content would go here...",
    category: "Figma",
    tags: ["demon slayer", "anime", "review", "figma"],
    author: {
      name: "John Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "mafex-spider-man-into-the-spider-verse-announced",
    title: "MAFEX Announces Spider-Man: Into the Spider-Verse Miles Morales",
    date: "2023-03-15",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "Medicom is bringing the animated Miles Morales to their MAFEX line with impressive attention to detail.",
    content: "Full announcement content would go here...",
    category: "MAFEX",
    tags: ["spider-man", "marvel", "new-release", "mafex"],
    author: {
      name: "Sarah Reviewer",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    slug: "revoltech-evangelion-unit-01-review",
    title: "Revoltech Evangelion Unit-01 Review",
    date: "2023-03-10",
    coverImage: "/placeholder.svg?height=600&width=1200",
    excerpt: "The iconic EVA-01 gets the Revoltech treatment with incredible articulation and accessories.",
    content: "Full review content would go here...",
    category: "Revoltech",
    tags: ["evangelion", "anime", "review", "revoltech"],
    author: {
      name: "Mike Collector",
      picture: "/placeholder.svg?height=100&width=100",
    },
  },
]

export async function getAllPosts(): Promise<Post[]> {
  // Sort posts by date (newest first)
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug)
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return posts
    .filter((post) => post.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const tagsSet = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return posts
    .filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getTagCounts(): Promise<Record<string, number>> {
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagCounts[tag]) {
        tagCounts[tag]++
      } else {
        tagCounts[tag] = 1
      }
    })
  })

  return tagCounts
}

export async function getRelatedPosts(currentPost: Post, limit = 3): Promise<Post[]> {
  // Find posts that share tags or are in the same category, excluding the current post
  const relatedPosts = posts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      (post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag))),
  )

  // Sort by relevance (number of matching tags)
  relatedPosts.sort((a, b) => {
    const aMatchingTags = a.tags.filter((tag) => currentPost.tags.includes(tag)).length
    const bMatchingTags = b.tags.filter((tag) => currentPost.tags.includes(tag)).length

    // If matching tags are equal, prioritize same category
    if (aMatchingTags === bMatchingTags) {
      if (a.category === currentPost.category && b.category !== currentPost.category) return -1
      if (a.category !== currentPost.category && b.category === currentPost.category) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime() // Then by date
    }

    return bMatchingTags - aMatchingTags // Sort by number of matching tags
  })

  return relatedPosts.slice(0, limit)
}
