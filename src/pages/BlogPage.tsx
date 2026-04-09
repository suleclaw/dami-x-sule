import { getAllPosts } from '../utils/posts';
import PostCard from '../components/PostCard';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">
            blog<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 font-code text-xs text-text-dim">
            {posts.length} post{posts.length !== 1 && 's'} published
          </p>
        </header>

        <div>
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="py-20 text-center font-serif text-text-dim">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
