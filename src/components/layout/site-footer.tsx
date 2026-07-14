import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "About", href: "/about" },
  { label: "Uses", href: "/uses" },
  { label: "Privacy", href: "/privacy" },
  { label: "Newsletter", href: "/#newsletter" },
  { label: "RSS", href: "/rss.xml" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="site-footer-grid">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em]">RHODA MUYA</p>
            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              Engineering notes on scalable systems, internal platforms and AI-powered workflows.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="site-footer-links">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
            <a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer noopener">
              Portfolio <ArrowUpRight size={13} />
            </a>
          </nav>
        </div>
        <div className="site-footer-meta">
          <span>© {new Date().getFullYear()} Rhoda Muya</span>
          <span>Built for useful, durable engineering notes.</span>
        </div>
      </div>
    </footer>
  );
}
