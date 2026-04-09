import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API unavailable */
    }
  };

  const tweetIntent = `https://x.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 rounded border border-border px-3 py-1.5
                   text-xs font-code text-text-dim transition-all
                   hover:border-accent hover:text-accent
                   active:scale-95"
        aria-label="Copy link to clipboard"
      >
        <CopyIcon />
        {copied ? 'copied!' : 'copy link'}
      </button>

      <a
        href={tweetIntent}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded border border-border px-3 py-1.5
                   text-xs font-code text-text-dim transition-all
                   hover:border-accent hover:text-accent"
        aria-label="Share on X"
      >
        <XIcon />
        share on x
      </a>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
