# Food Travels

![App Preview](https://imgix.cosmicjs.com/b8a68920-aaf4-11f1-92b2-41d3c0e1d83e-autopilot-photo-1504674900247-0877df9cc836-1788810347175.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A warm, editorial food and travel blog showcasing street food, fine dining, markets, recipes, and budget travel discovered on the road — built with Next.js 16 and Cosmic.

## Features

- 🏠 Hero-driven homepage with a featured post and grid of recent stories
- 📚 Full posts archive with category and tag filtering
- 📖 Rich post detail pages with featured image, author byline, and category
- 🏷️ Category archive pages
- ✍️ Author profile pages with bio, photo, location, and their posts
- ℹ️ About page introducing the brand and writers
- 📱 Fully responsive, fast, and accessible
- 🎨 Warm editorial design with elegant serif/sans typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a9f143894e842fb7a86ae16&clone_repository=6a9f169194e842fb7a86ae83)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A food travel blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js application for a company website called "Food Travels". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A food and travel blog website called "Food Travels". It should showcase posts about food discovered while traveling — street food, fine dining, markets, recipes, and budget travel. Pages needed: a striking home page with a featured/hero post and a grid of recent posts, a full posts listing page with filtering by category and tag, individual post detail pages rendering the rich-text content with featured image, author byline (name, photo, bio, location) and category, category archive pages, author profile pages listing their posts, and an about page. Design should be warm, editorial, and photo-forward with big imagery, generous whitespace, and elegant typography. Fully responsive and fast. Use the existing Cosmic content types: posts (excerpt, content, featured_image, tags, author, category), authors (name, bio, photo, location), categories (name, description).

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via the [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `posts`, `authors`, and `categories` object types

### Installation

```bash
bun install
```

Set up your environment variables (see below), then run:

```bash
bun run dev
```

Visit `http://localhost:3000` to view the app.

## Cosmic SDK Examples

```typescript
import { getCosmic } from '@/lib/cosmic-preview'

// Fetch all posts with connected author & category data
const { cosmic, previewToken } = await getCosmic()
const query = cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
const { objects } = previewToken ? await query.status('any') : await query
```

```typescript
// Fetch posts by category id
const { objects } = await cosmic.objects
  .find({ type: 'posts', 'metadata.category': categoryId })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three Cosmic object types:

- **posts** — `excerpt`, `content`, `featured_image`, `tags`, `author` (connected to authors), `category` (connected to categories)
- **authors** — `name`, `bio`, `photo`, `location`
- **categories** — `name`, `description`

All connected objects (author, category) are resolved automatically using the `depth` parameter so no extra queries are required to render bylines and category badges.

## Deployment Options

### Vercel

1. Push your code to a GitHub repository
2. Import the repository into [Vercel](https://vercel.com)
3. Add the required environment variables in the project settings
4. Deploy

### Netlify

1. Push your code to a GitHub repository
2. Import the repository into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the required environment variables in the site settings
5. Deploy

Set these environment variables in your hosting platform's dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->