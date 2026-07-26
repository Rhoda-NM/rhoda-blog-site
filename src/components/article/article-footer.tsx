import type { ArticleDetail } from "@/types/article";

import { NewsletterSignup } from "../newsletter/newsletter-signup";
import { AuthorCard } from "./author-card";
import { RelatedArticles } from "./related-articles";
import { ShareActions } from "./share-actions";

export function ArticleFooter({ article }: { article: ArticleDetail }) {
  const articleUrl = `https://blog.rhodamuya.dev/articles/${article.slug}`;

  return (
    <footer className="article-footer">
      <div className="reading-shell">
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
      </div>

      <div className="article-ending-wide article-closing-grid">
        <AuthorCard />
        <ShareActions title={article.title} url={articleUrl} />
      </div>

      <div className="article-ending-wide">
        <NewsletterSignup />
      </div>

      <RelatedArticles articles={article.relatedArticles ?? []} />
    </footer>
  );
}
