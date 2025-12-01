import type { ComponentType } from 'react'

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  featured: boolean;
  imageUrl: string;
  authorName: string;
  createdAt: string;
  views: number;
  likes: number;
  commentCount: number;
  readTime?: string;
  content: ComponentType<any> | null;
}

const modules = import.meta.glob<any>('./articles/*.mdx', { eager: true })

export const getArticles = (): Article[] => {
  const articles = Object.entries(modules).map(([path, mod]) => {
    const fileName = path.split('/').pop()?.replace(/\.mdx$/, '')
    const slug = fileName ? fileName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : ''

    // Handle both frontmatter export styles
    const meta = mod.frontmatter || mod.meta || {}
    
    // Log for debugging
    console.log(`Loading article from ${path}:`, { moduleKeys: Object.keys(mod), hasDefault: !!mod.default })
    if (!mod.default) {
      console.warn(`No default export found for ${path}. Module:`, mod)
    }
    
    return {
      id: slug,
      ...meta,
      content: mod.default ?? null, // React component or null if not found
      slug,
      // Fallback values if not in frontmatter
      title: meta.title || fileName || 'Untitled',
      excerpt: meta.excerpt || '',
      category: meta.category || 'General',
      featured: meta.featured ?? false,
      imageUrl: meta.imageUrl || '',
      authorName: meta.authorName || 'Author',
      createdAt: meta.createdAt || new Date().toISOString(),
      views: meta.views ?? 0,
      likes: meta.likes ?? 0,
      commentCount: meta.commentCount ?? 0,
      readTime: meta.readTime || '5 min read'
    }
  })

  return articles
}