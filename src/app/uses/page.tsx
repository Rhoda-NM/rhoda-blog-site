import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The development stack, tools, and working practices behind Rhoda Muya's engineering work.",
};

const groups = [
  { title: "Build", items: ["TypeScript and React", "Next.js App Router", "Node.js services", "PostgreSQL and Prisma", "Sanity for structured editorial content"] },
  { title: "Systems", items: ["GitHub for source and delivery", "Vercel for web deployment", "Cloud platforms chosen to fit the workload", "Structured logs, traces and actionable alerts"] },
  { title: "Workflow", items: ["Architecture notes before implementation", "Small reviewable changes", "Automated linting, type checks and production builds", "Decision records for consequential trade-offs"] },
];

export default function UsesPage() {
  return (
    <main>
      <header className="technical-grid border-b border-border">
        <div className="site-shell py-16 sm:py-20">
          <span className="technical-label">Uses</span>
          <h1 className="editorial-heading mt-6 max-w-4xl text-[clamp(3rem,7vw,5.5rem)] leading-none">Tools selected for clarity and leverage<span className="text-burgundy-soft">.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A practical snapshot of the stack and habits I use. Tools change; the criteria behind them should remain legible.</p>
        </div>
      </header>
      <section className="site-shell section-spacing grid gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="surface-card p-6 sm:p-7">
            <h2 className="text-2xl">{group.title}</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
              {group.items.map((item) => <li key={item} className="border-t border-border pt-3">{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
