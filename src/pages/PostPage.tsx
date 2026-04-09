import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug } from '../utils/posts';
import ShareButtons from '../components/ShareButtons';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Dami×Sule`;
    }
  }, [post]);

  if (!post) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <h1 className="text-2xl font-bold text-text">404</h1>
        <p className="mt-2 font-serif text-text-dim">Post not found.</p>
        <Link
          to="/blog"
          className="mt-6 font-code text-xs text-accent hover:underline"
        >
          &larr; back to blog
        </Link>
      </main>
    );
  }

  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="flex-1 px-6 py-12">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 animate-fade-in">
          <Link
            to="/blog"
            className="font-code text-xs text-text-dim hover:text-accent transition-colors"
          >
            &larr; back to blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-code text-xs text-text-dim">
            <time>{post.date}</time>
            <span className="text-border">|</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl animate-fade-in stagger-1">
            {post.title}
          </h1>

          <p className="mt-3 font-serif text-sm leading-relaxed text-text-dim animate-fade-in stagger-2">
            {post.excerpt}
          </p>
        </header>

        <div className="animate-fade-in stagger-3">
          <div className="prose prose-invert prose-terminal max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <footer className="mt-12 border-t border-border pt-6 animate-fade-in stagger-4">
          <ShareButtons title={post.title} url={postUrl} />
        </footer>
      </article>
    </main>
  );
}
