import type { Metadata } from "next";
import {
  Geist_Mono,
  Inter,
  Manrope,
  Newsreader,
} from "next/font/google";

import "./globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.rhodamuya.dev"),

  title: {
    default: "Rhoda Muya — Engineering Notes",
    template: "%s | Rhoda Muya",
  },

  description:
    "Field notes on scalable systems, AI workflows, product engineering, and engineering for business growth.",

  openGraph: {
    type: "website",
    siteName: "Rhoda Muya Engineering Notes",
    title: "Rhoda Muya — Engineering Notes",
    description:
      "Field notes on scalable systems, AI workflows, and engineering for growth.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rhoda Muya — Engineering Notes",
    description:
      "Field notes on scalable systems, AI workflows, and engineering for growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${inter.variable}
        ${manrope.variable}
        ${newsreader.variable}
        ${geistMono.variable}
      `}
    >
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
