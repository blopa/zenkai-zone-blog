import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  content: string
  category: string
  language?: string
  tags: string[]
  author: {
    name: string
    picture: string
  }
}

// Directory structure: data/blog/[year]/[slug].md
const blogDirectory = path.join(process.cwd(), 'data/blog')

// Get all years directories
const getYearDirectories = (): string[] => {
  try {
    if (!fs.existsSync(blogDirectory)) {
      return []
    }
    return fs.readdirSync(blogDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch (error) {
    console.error('Error reading blog directories:', error)
    return []
  }
}

// Get markdown files from all year directories
const getMarkdownFiles = (): string[] => {
  const years = getYearDirectories()
  let markdownFiles: string[] = []
  
  years.forEach(year => {
    const yearDir = path.join(blogDirectory, year)
    try {
      const files = fs.readdirSync(yearDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(year, file))
      
      markdownFiles = [...markdownFiles, ...files]
    } catch (error) {
      console.error(`Error reading files from ${yearDir}:`, error)
    }
  })
  
  return markdownFiles
}

// Parse markdown content into HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html)
    .process(markdown)
  return result.toString()
}

// Get post data from markdown file
async function getPostFromFile(filePath: string): Promise<Post> {
  const fullPath = path.join(blogDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(content)
  
  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    coverImage: data.coverImage,
    excerpt: data.excerpt,
    content: htmlContent,
    category: data.category,
    language: data.language || 'en-US',
    tags: data.tags || [],
    author: {
      name: data.author?.name || 'Anonymous',
      picture: data.author?.picture || '/placeholder.svg?height=100&width=100',
    }
  }
}

// Cache posts to avoid reading files multiple times
let _posts: Post[] | null = null

/**
 * Get all blog posts from markdown files
 */
export async function getAllPosts(): Promise<Post[]> {
  if (_posts) return _posts
  
  const filePaths = getMarkdownFiles()
  const postsPromises = filePaths.map(filePath => getPostFromFile(filePath))
  _posts = await Promise.all(postsPromises)
  
  // Sort posts by date (newest first)
  return _posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single post by its slug
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug)
}

/**
 * Get all posts for a specific category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get all unique categories from posts
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  return [...new Set(posts.map((post) => post.category))]
}

/**
 * Get all unique tags across all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const allTags = posts.flatMap((post) => post.tags)
  return [...new Set(allTags)]
}

/**
 * Get all posts with a specific tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get count of posts for each tag
 */
export async function getTagCounts(): Promise<Record<string, number>> {
  const posts = await getAllPosts()
  const allTags = posts.flatMap((post) => post.tags)
  const tagCounts: Record<string, number> = {}

  allTags.forEach((tag) => {
    if (tagCounts[tag]) {
      tagCounts[tag]++
    } else {
      tagCounts[tag] = 1
    }
  })

  return tagCounts
}

/**
 * Get posts related to the current post based on shared tags
 */
export async function getRelatedPosts(
  currentPost: Post,
  limit = 3
): Promise<Post[]> {
  const posts = await getAllPosts()
  
  // First, get posts that share at least one tag with the current post
  const postsWithSharedTags = posts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      post.tags.some((tag) => currentPost.tags.includes(tag))
  )

  // If we have more posts than the limit, sort by number of shared tags
  if (postsWithSharedTags.length > limit) {
    return postsWithSharedTags
      .sort((a, b) => {
        const aSharedTags = a.tags.filter((tag) =>
          currentPost.tags.includes(tag)
        ).length
        const bSharedTags = b.tags.filter((tag) =>
          currentPost.tags.includes(tag)
        ).length
        return bSharedTags - aSharedTags
      })
      .slice(0, limit)
  }

  // If we don't have enough related posts, find posts in the same category
  if (postsWithSharedTags.length < limit) {
    const postsInSameCategory = posts.filter(
      (post) =>
        post.slug !== currentPost.slug &&
        !postsWithSharedTags.some(p => p.slug === post.slug) &&
        post.category === currentPost.category
    )

    return [...postsWithSharedTags, ...postsInSameCategory].slice(0, limit)
  }

  return postsWithSharedTags
}
