//src/components/article/portable-article.tsx
import type { PortableTextComponents } from "next-sanity";
import { PortableText } from "next-sanity";
import { Image } from "next-sanity/image";
import {
  AlertTriangle,
  GitCompareArrows,
  Landmark,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

import { FlowDiagram, type ArticleFlowDiagram } from "@/components/article/flow-diagram"; 

import { urlFor } from "@/sanity/lib/image";
import type {
  ArticleCallout,
  ArticleDetail,
  SanityImage,
} from "@/types/article";

import { getArticleHeadings } from "./article-headings";
import {
  ArticleTable,
  type ArticleTable as ArticleTableValue,
} from "./article-table";
import { CodeBlock } from "./code-block";

type LinkValue = {
  href?: string;
  openInNewTab?: boolean;
};

const calloutLabels = {
  insight: "Engineering insight",
  warning: "Warning",
  tradeoff: "Trade-off",
  decision: "Architecture decision",
} as const;

const calloutIcons = {
  insight: Lightbulb,
  warning: AlertTriangle,
  tradeoff: GitCompareArrows,
  decision: Landmark,
} as const;

const linkMark: NonNullable<PortableTextComponents["marks"]>[string] = ({
  children,
  value,
}) => {
  const link = value as LinkValue;
  const href = link?.href ?? "#";
  const isExternal =
    href.startsWith("http://") || href.startsWith("https://");

  if (isExternal || link.openInNewTab) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
};

function createPortableTextComponents(
  headingIds: Map<string, string>,
): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => (
        <h2 id={value._key ? headingIds.get(value._key) : undefined}>
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 id={value._key ? headingIds.get(value._key) : undefined}>
          {children}
        </h3>
      ),
    },
    types: {
      code: CodeBlock,
      flowDiagram: ({ value }) => (
        <FlowDiagram value={value as ArticleFlowDiagram} />
      ),
      table: ({ value }) => (
        <ArticleTable value={value as ArticleTableValue} />
      ),
      image: ({ value }) => {
        const image = value as SanityImage;

        if (!image?.asset) {
          return null;
        }

        return (
          <figure className="not-prose my-10">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted">
              <Image
                src={urlFor(image)
                  .width(1400)
                  .height(900)
                  .fit("max")
                  .auto("format")
                  .url()}
                alt={image.alt ?? ""}
                width={1400}
                height={900}
                sizes="(max-width: 768px) 100vw, 760px"
                className="h-auto w-full object-cover"
              />
            </div>

            {image.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {image.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      callout: ({ value }) => {
        const callout = value as ArticleCallout;
        const tone = callout.tone ?? "insight";
        const Icon = calloutIcons[tone];

        return (
          <aside className="callout not-prose" data-tone={tone}>
            <Icon className="callout-icon" size={20} aria-hidden="true" />
            <div>
              <p className="callout-title">
                {callout.title || calloutLabels[tone]}
              </p>
              {callout.content && (
                <div className="callout-content">
                  <PortableText
                    value={callout.content}
                    components={{ marks: { link: linkMark } }}
                  />
                </div>
              )}
            </div>
          </aside>
        );
      },
    },

    marks: {
      link: linkMark,
    },
  };
}

export function PortableArticle({
  article,
}: {
  article: Pick<ArticleDetail, "body">;
}) {
  if (!article.body?.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-muted-foreground">
        The article body has not been published yet.
      </div>
    );
  }

  const headingIds = new Map(
    getArticleHeadings(article.body).map((heading) => [
      heading.key,
      heading.id,
    ]),
  );

  return (
    <div className="prose article-prose max-w-none">
      <PortableText
        value={article.body}
        components={createPortableTextComponents(headingIds)}
      />
    </div>
  );
}
