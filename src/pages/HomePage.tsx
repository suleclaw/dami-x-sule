import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="animate-fade-in text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          minimal<span className="text-accent">blog</span>
        </h1>

        <div className="mt-4 flex items-center justify-center gap-1 font-code text-sm text-text-dim">
          <span>&gt;</span>
          <span className="inline-block h-5 w-2.5 bg-accent animate-blink" />
        </div>

        <p className="mt-8 max-w-md font-serif text-sm leading-relaxed text-text-dim animate-fade-in stagger-2">
          A quiet corner of the internet.
          <br />
          Words on building, shipping, and the spaces in between.
        </p>

        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded border border-accent
                     px-5 py-2 font-code text-xs text-accent
                     transition-all hover:bg-accent hover:text-bg
                     animate-fade-in stagger-3 animate-glow-pulse"
        >
          enter blog &rarr;
        </Link>
      </div>
    </main>
  );
}
