import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function AuthorCard() {
  return (
    <section className="author-card" aria-labelledby="author-card-title">
      <div className="author-monogram" aria-hidden="true">RM</div>
      <div>
        <span className="technical-label">About the author</span>
        <h2 id="author-card-title" className="mt-4 text-3xl">
          Written by Rhoda Muya
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          {siteConfig.author.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={siteConfig.portfolioUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="button-primary"
          >
            View My Work <ArrowUpRight size={15} />
          </a>
          <a
            href={siteConfig.contactUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="button-secondary"
          >
            Discuss a System <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
