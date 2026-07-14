import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Rhoda Muya, her engineering work, and the philosophy behind these notes.",
};

export default function AboutPage() {
  return (
    <main>
      <header className="technical-grid border-b border-border">
        <div className="reading-shell py-16 sm:py-20">
          <span className="technical-label">About</span>
          <h1 className="editorial-heading mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Systems should make work clearer<span className="text-burgundy-soft">.</span>
          </h1>
        </div>
      </header>
      <div className="reading-shell section-spacing page-prose">
        <p className="lead">I’m Rhoda Muya. I design and build scalable business systems, internal platforms, and AI-powered workflows.</p>
        <h2>Why I write</h2>
        <p>These notes document the decisions behind real engineering work: data boundaries, operational constraints, architecture trade-offs, automation, and the parts of product development that diagrams tend to omit.</p>
        <p>I write to make durable technical judgment visible—not only finished interfaces or polished outcomes.</p>
        <h2>How I work</h2>
        <p>I start with the operating problem, map the information and decision flows, and then choose the smallest architecture that can remain understandable as the business grows.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer noopener" className="button-primary">View My Work <ArrowUpRight size={15} /></a>
          <a href={siteConfig.contactUrl} target="_blank" rel="noreferrer noopener" className="button-secondary">Discuss a System <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </main>
  );
}
