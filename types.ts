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

export interface CosmicFile {
  url: string
  imgix_url: string
}

// Matches the "categories" object type: name (text), description (textarea)
export interface CategoryMetadata {
  name?: string
  description?: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: CategoryMetadata
}

// Matches the "authors" object type:
// name (text), bio (textarea), photo (file/image), location (text)
export interface AuthorMetadata {
  name?: string
  bio?: string
  photo?: CosmicFile
  location?: string
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: AuthorMetadata
}

// Matches the "posts" object type: excerpt (textarea), content (rich-text),
// featured_image (file/image), tags (multi-select), author (object ->
// authors), category (object -> categories)
//
// published_date is not currently a metafield on the "posts" object type.
// It is declared optional because sortPostsByDate() reads it opportunistically
// and falls back to created_at when it is absent. If a published_date field is
// added in Cosmic later, existing sorting picks it up with no code change.
export interface PostMetadata {
  excerpt?: string
  content?: string
  featured_image?: CosmicFile
  tags?: string[] | string
  author?: Author
  category?: Category
  published_date?: string
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
