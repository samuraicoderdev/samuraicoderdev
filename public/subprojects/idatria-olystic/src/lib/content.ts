import { z } from 'zod';
import matter from 'gray-matter';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Zod Schema to validate Frontmatter / DB schema (Astro-like Validation)
export const BlogPostSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  image: z.string(),
  date: z.string().optional(),
  readTime: z.string().optional(),
  author: z.string().optional(),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostSchema>;

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

// Zod schema for full DB document runtime validation
export const DbBlogPostSchema = BlogPostSchema.extend({
  slug: z.string(),
  content: z.string(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional()
});

// We use Vite's import.meta.glob to read all markdown files.
const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });

// Used purely to extract local files (for migration)
export function getLocalBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const path in modules) {
    const rawMarkdown = modules[path] as string;
    const parsed = matter(rawMarkdown);
    const frontmatter = BlogPostSchema.parse(parsed.data);
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
    posts.push({ slug, frontmatter, content: parsed.content });
  }
  return posts.sort((a, b) => new Date(b.frontmatter.date || 0).getTime() - new Date(a.frontmatter.date || 0).getTime());
}

// Firebase ASYNC fetch with Astro-like Zod validation
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    
    if (querySnapshot.empty) {
      // Fallback to local if never migrated
      return getLocalBlogPosts();
    }

    const posts: BlogPost[] = [];
    querySnapshot.forEach((document) => {
      // Zod Validation layer on top of Firestore document (Like Astro Collections)
      const parsedData = DbBlogPostSchema.parse({ id: document.id, ...document.data() });
      
      posts.push({
        slug: parsedData.slug,
        content: parsedData.content,
        frontmatter: {
          title: parsedData.title,
          excerpt: parsedData.excerpt,
          category: parsedData.category,
          image: parsedData.image,
          date: parsedData.date,
          readTime: parsedData.readTime,
          author: parsedData.author,
        }
      });
    });

    return posts.sort((a, b) => new Date(b.frontmatter.date || 0).getTime() - new Date(a.frontmatter.date || 0).getTime());

  } catch (err) {
    console.error("Error fetching posts from Firebase, falling back to local:", err);
    return getLocalBlogPosts();
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const docRef = doc(db, 'posts', slug);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
       // Look in local manually if not found in db
       return getLocalBlogPosts().find(p => p.slug === slug);
    }
    
    // Validate the incoming DB object
    const parsedData = DbBlogPostSchema.parse(snap.data());

    return {
      slug: parsedData.slug,
      content: parsedData.content,
      frontmatter: {
        title: parsedData.title,
        excerpt: parsedData.excerpt,
        category: parsedData.category,
        image: parsedData.image,
        date: parsedData.date,
        readTime: parsedData.readTime,
        author: parsedData.author,
      }
    };
  } catch (err) {
    console.error("Error fetching single post from Firebase:", err);
    return getLocalBlogPosts().find(p => p.slug === slug);
  }
}
