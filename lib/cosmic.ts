import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Category, Author } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function parseTags(tags: unknown): string[] {
  if (!tags) return []
  if (Array.isArray(tags)) {
    return tags.map((t) => getMetafieldValue(t)).filter(Boolean)
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  return []
}

function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
    const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
    return dateB - dateA
  })
}

// Posts

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return sortPostsByDate(response.objects as Post[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'content', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return (response.object as Post) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return sortPostsByDate(response.objects as Post[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by category')
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return sortPostsByDate(response.objects as Post[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by author')
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => {
    const tags = parseTags(post.metadata?.tags)
    return tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  })
}

export function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    const tags = parseTags(post.metadata?.tags)
    tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function filterPosts(
  posts: Post[],
  options: { category?: string; tag?: string; author?: string }
): Post[] {
  return posts.filter((post) => {
    if (options.category) {
      const categorySlug = post.metadata?.category?.slug
      if (categorySlug !== options.category) return false
    }
    if (options.author) {
      const authorSlug = post.metadata?.author?.slug
      if (authorSlug !== options.author) return false
    }
    if (options.tag) {
      const tags = parseTags(post.metadata?.tags)
      if (!tags.some((t) => t.toLowerCase() === options.tag?.toLowerCase())) return false
    }
    return true
  })
}

// Categories

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Authors

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1)

    return (response.object as Author) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch author')
  }
}