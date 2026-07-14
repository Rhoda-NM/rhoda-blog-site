// This file is used to generate the robots.txt for the website. It defines the rules for web crawlers and specifies the location of the sitemap.
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio",
        "/api",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}