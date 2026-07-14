import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site";

const navigation = [
  { label: "Articles", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "About", href: "/about" },
  { label: "Uses", href: "/uses" },
];

export function SiteHeader() {
  return (
    <header
      className="
        sticky top-0 z-50 border-b border-border
        bg-background/88 backdrop-blur-xl
      "
    >
      <div className="site-shell flex min-h-[var(--header-height)] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Rhoda Muya Engineering Notes homepage"
          className="flex min-w-0 items-center gap-3"
        >
          <span className="truncate text-sm font-semibold tracking-[0.16em] text-foreground">
            RHODA MUYA
          </span>

          <span
            aria-hidden="true"
            className="hidden size-1 rounded-full bg-brass sm:block"
          />

          <span className="hidden font-mono text-[0.68rem] font-medium tracking-[0.11em] text-brass sm:block">
            ENGINEERING NOTES
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  text-sm font-medium text-muted-foreground
                  transition-colors hover:text-foreground
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <details className="mobile-menu md:hidden">
            <summary aria-label="Open navigation menu">
              <Menu size={19} />
            </summary>
            <nav aria-label="Mobile navigation" className="mobile-menu-panel">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Link href="/#newsletter">Newsletter</Link>
              <a href="/rss.xml">RSS</a>
              <a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer noopener">
                Portfolio <ArrowUpRight size={14} />
              </a>
            </nav>
          </details>

          <ThemeToggle />

          <Link
            href="/articles"
            className="button-primary hidden sm:inline-flex"
          >
            Start reading
          </Link>
        </div>
      </div>
    </header>
  );
}
