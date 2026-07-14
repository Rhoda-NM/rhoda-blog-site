import type { ArticleDetail } from "@/types/article";

import { NewsletterSignup } from "../newsletter/newsletter-signup";
import { AuthorCard } from "./author-card";
import { RelatedArticles } from "./related-articles";
import { ShareActions } from "./share-actions";

export function ArticleFooter({ article }: { article: ArticleDetail }) {
  const articleUrl = `https://blog.rhodamuya.dev/articles/${article.slug}`;

  return (
    <footer className="article-footer">
      <div className="reading-shell article-ending-stack">
        {article.engineeringTakeaway && (
          <section className="engineering-takeaway" aria-labelledby="takeaway-title">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-brass">
              Engineering takeaway
            </span>
            <h2 id="takeaway-title" className="sr-only">Engineering takeaway</h2>
            <p className="mt-4 text-lg leading-8 text-foreground-soft">
              {article.engineeringTakeaway}
            </p>
          </section>
        )}

        {article.tags && article.tags.length > 0 && (
          <section className="article-ending-section" aria-label="Article tags">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <ShareActions title={article.title} url={articleUrl} />
        <AuthorCard />
      </div>

      <RelatedArticles articles={article.relatedArticles ?? []} />

      <div className="article-ending-wide">
        <NewsletterSignup />
      </div>
    </footer>
  );
}
