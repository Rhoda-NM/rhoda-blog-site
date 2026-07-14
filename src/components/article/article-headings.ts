import type { PortableTextBlock } from "@portabletext/types";

import type { ArticleBodyBlock } from "@/types/article";

export type ArticleHeading = {
  id: string;
  key: string;
  level: 2 | 3;
  text: string;
};

function headingText(block: PortableTextBlock) {
  return block.children
    .map((child) => ("text" in child ? child.text : ""))
    .join("")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";
}

export function getArticleHeadings(
  body: ArticleBodyBlock[] | undefined,
): ArticleHeading[] {
  const usedIds = new Map<string, number>();

  return (body ?? []).flatMap((item) => {
    if (
      item._type !== "block" ||
      !("children" in item) ||
      !("style" in item) ||
      !item._key ||
      (item.style !== "h2" && item.style !== "h3")
    ) {
      return [];
    }

    const text = headingText(item);
    if (!text) {
      return [];
    }

    const baseId = slugify(text);
    const occurrence = (usedIds.get(baseId) ?? 0) + 1;
    usedIds.set(baseId, occurrence);

    return [
      {
        id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
        key: item._key,
        level: item.style === "h2" ? 2 : 3,
        text,
      },
    ];
  });
}
