import type { ArticleHeading } from "./article-headings";

export function TableOfContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="article-toc">
      <span className="article-toc-label">On this page</span>
      <ol className="article-toc-list">
        {headings.map((heading) => (
          <li key={heading.key} data-level={heading.level}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
