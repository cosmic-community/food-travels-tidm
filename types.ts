export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface CategoryMetadata {
  description?: string
  color?: string
  icon?: {
    url: string
    imgix_url: string
  }
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: CategoryMetadata
}

export interface AuthorMetadata {
  bio?: string
  avatar?: {
    url: string
    imgix_url: string
  }
  email?: string
  twitter?: string
  instagram?: string
  website?: string
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: AuthorMetadata
}

export interface PostMetadata {
  content?: string
  summary?: string
  excerpt?: string
  featured_image?: {
    url: string
    imgix_url: string
  }
  author?: Author
  category?: Category
  tags?: string[] | string
  published_date?: string
  status?: string
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: PostMetadata
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}