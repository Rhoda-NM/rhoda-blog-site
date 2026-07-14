import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookBody = {
  _type?: "article" | "category";
  slug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation secret is not configured." }, { status: 503 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(request, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }

    const tags = body?._type === "category"
      ? ["categories", "articles", "homepage", "sitemap"]
      : ["articles", "homepage", "sitemap"];

    for (const tag of tags) revalidateTag(tag, { expire: 0 });

    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/topics");
    revalidatePath("/rss.xml");
    revalidatePath("/sitemap.xml");

    if (body?.slug) {
      revalidateTag(`article:${body.slug}`, { expire: 0 });
      revalidatePath(`/articles/${body.slug}`);
      revalidatePath(`/topics/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true, tags, slug: body?.slug });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid webhook payload." },
      { status: 400 },
    );
  }
}
