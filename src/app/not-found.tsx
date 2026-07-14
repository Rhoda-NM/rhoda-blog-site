import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="technical-grid">
      <div className="site-shell flex min-h-[70svh] items-center justify-center py-20">
        <div className="max-w-2xl text-center">
          <span className="technical-label">404</span>

          <h1 className="editorial-heading mt-6 text-[clamp(4rem,10vw,8rem)] leading-[0.9]">
            This note could not be found
            <span className="text-burgundy-soft">.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            The article or topic may have moved, remained a draft, or
            does not exist.
          </p>

          <Link
            href="/articles"
            className="button-primary mt-8"
          >
            <ArrowLeft size={16} />
            Browse articles
          </Link>
        </div>
      </div>
    </main>
  );
}