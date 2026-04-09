import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="border-b border-border px-6 py-4 animate-fade-in">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 text-text hover:text-accent transition-colors"
        >
          <span className="inline-block h-4 w-1 bg-accent animate-glow-pulse" />
          <span className="text-sm tracking-widest uppercase">
            minimal<span className="text-accent">blog</span>
          </span>
        </Link>

        <div className="flex gap-6 text-xs tracking-wider uppercase">
          <Link
            to="/"
            className={`transition-colors hover:text-accent ${
              pathname === '/' ? 'text-accent' : 'text-text-dim'
            }`}
          >
            home
          </Link>
          <Link
            to="/blog"
            className={`transition-colors hover:text-accent ${
              pathname.startsWith('/blog') || pathname.startsWith('/post')
                ? 'text-accent'
                : 'text-text-dim'
            }`}
          >
            blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
