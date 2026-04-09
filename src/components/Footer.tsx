export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 mt-auto">
      <div className="mx-auto flex max-w-3xl items-center justify-between text-xs text-text-dim">
        <span className="font-code">
          &copy; {new Date().getFullYear()} minimal
          <span className="text-accent">blog</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
          <span className="font-code">system active</span>
        </span>
      </div>
    </footer>
  );
}
