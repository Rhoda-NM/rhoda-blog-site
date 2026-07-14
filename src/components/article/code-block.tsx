import { bundledLanguages, codeToTokens } from "shiki";

import type { ArticleCodeBlock } from "@/types/article";

import { CopyCodeButton } from "./copy-code-button";

const languageNames: Record<string, string> = {
  bash: "Bash",
  go: "Go",
  javascript: "JavaScript",
  json: "JSON",
  prisma: "Prisma",
  python: "Python",
  sql: "SQL",
  tsx: "TSX",
  typescript: "TypeScript",
};

export async function CodeBlock({ value }: { value: ArticleCodeBlock }) {
  if (!value.code) {
    return null;
  }

  const requestedLanguage = value.language ?? "text";
  const language =
    requestedLanguage in bundledLanguages ? requestedLanguage : "text";
  const highlightedLines = new Set(value.highlightedLines ?? []);
  const result = await codeToTokens(value.code, {
    lang: language as keyof typeof bundledLanguages,
    theme: "github-dark-default",
  });

  return (
    <figure className="code-block not-prose">
      <figcaption className="code-block-header">
        <span className="code-block-filename">
          {value.filename || "Code example"}
        </span>

        <div className="code-block-actions">
          <span className="code-language-label">
            {languageNames[requestedLanguage] ?? requestedLanguage}
          </span>
          <CopyCodeButton code={value.code} />
        </div>
      </figcaption>

      <pre className="code-block-pre" tabIndex={0}>
        <code>
          {result.tokens.map((line, index) => {
            const lineNumber = index + 1;

            return (
              <span
                key={lineNumber}
                className="code-line"
                data-highlighted={
                  highlightedLines.has(lineNumber) || undefined
                }
              >
                <span className="code-line-number" aria-hidden="true">
                  {lineNumber}
                </span>
                <span className="code-line-content">
                  {line.length > 0
                    ? line.map((token, tokenIndex) => (
                        <span
                          key={`${token.offset}-${tokenIndex}`}
                          style={{ color: token.color }}
                        >
                          {token.content}
                        </span>
                      ))
                    : "\n"}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
