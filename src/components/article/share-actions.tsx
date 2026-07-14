"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function ShareActions({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="article-ending-section" aria-labelledby="share-title">
      <h2 id="share-title" className="article-ending-title">
        Was this useful?
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={copyLink} className="button-secondary">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="button-secondary"
        >
          <span className="font-bold" aria-hidden="true">in</span>
          LinkedIn
        </a>
        <a
          href={xUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="button-secondary"
        >
          <span className="font-semibold" aria-hidden="true">𝕏</span>
          <span className="sr-only">Share on </span>X
        </a>
      </div>
    </section>
  );
}
