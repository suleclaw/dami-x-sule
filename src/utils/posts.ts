import matter from 'gray-matter';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const modules = import.meta.glob('/src/posts/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

function formatDate(date: Date): string {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function parsePost(filePath: string, raw: string): Post {
  const slug = filePath.replace('/src/posts/', '').replace('.md', '');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? 'Untitled',
    date: formatDate(new Date(data.date)),
    excerpt: data.excerpt ?? '',
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { content: _content, ...meta } = parsePost(path, raw as string);
      void _content;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  for (const [path, raw] of Object.entries(modules)) {
    const post = parsePost(path, raw as string);
    if (post.slug === slug) return post;
  }
  return undefined;
}
