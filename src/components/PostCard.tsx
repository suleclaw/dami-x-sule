import { Link } from 'react-router-dom';
import type { PostMeta } from '../utils/posts';

interface PostCardProps {
  post: PostMeta;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <Link
      to={`/post/${post.slug}`}
      className={`group block border-b border-border px-2 py-8
                  transition-colors hover:bg-surface
                  animate-fade-in stagger-${index + 1}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <time className="shrink-0 font-code text-xs text-text-dim tracking-wider">
          {post.date}
        </time>
        <span className="font-code text-xs text-text-dim">
          {post.readingTime} min read
        </span>
      </div>

      <h2 className="mt-3 text-lg font-bold leading-snug text-text group-hover:text-accent transition-colors">
        {post.title}
      </h2>

      <p className="mt-2 font-serif text-sm leading-relaxed text-text-dim">
        {post.excerpt}
      </p>

      <span className="mt-3 inline-block font-code text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        read more &rarr;
      </span>
    </Link>
  );
}
