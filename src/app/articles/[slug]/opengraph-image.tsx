import { ImageResponse } from "next/og";

import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { ArticleDetail } from "@/types/article";

export const alt = "Rhoda Muya Engineering Notes article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client.fetch<ArticleDetail | null>(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 82px",
        color: "#211b1d",
        background: "#f6f0e7",
        backgroundImage:
          "linear-gradient(rgba(78,55,48,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(78,55,48,.08) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      <div style={{ display: "flex", color: "#8b1e24", fontSize: 22, letterSpacing: 3 }}>
        {article?.category?.title?.toUpperCase() ?? "ENGINEERING NOTE"}
      </div>
      <div style={{ display: "flex", maxWidth: 1020, fontSize: 68, lineHeight: 1.05, fontWeight: 600 }}>
        {article?.title ?? "Rhoda Muya Engineering Notes"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>RHODA MUYA</span>
        <span style={{ color: "#9a6a1f" }}>ENGINEERING NOTES</span>
      </div>
    </div>,
    size,
  );
}
