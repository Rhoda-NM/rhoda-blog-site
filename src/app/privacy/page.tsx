import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for Rhoda Muya Engineering Notes.",
};

export default function PrivacyPage() {
  return (
    <main>
      <header className="technical-grid border-b border-border">
        <div className="reading-shell py-16 sm:py-20">
          <span className="technical-label">Privacy</span>
          <h1 className="editorial-heading mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-none">Clear data practices<span className="text-burgundy-soft">.</span></h1>
          <p className="mt-5 text-sm text-muted-foreground">Last updated 14 July 2026</p>
        </div>
      </header>
      <div className="reading-shell section-spacing page-prose">
        <h2>Newsletter</h2>
        <p>When you subscribe, your email address and signup source are sent to Buttondown to deliver the newsletter and manage subscriptions. Buttondown uses double opt-in, so you must confirm your address before receiving notes. You can unsubscribe from any email.</p>
        <h2>Analytics</h2>
        <p>This site may use privacy-conscious, aggregate analytics to understand which pages are useful. The site does not sell personal information or build advertising profiles.</p>
        <h2>Cookies</h2>
        <p>Essential cookies may be used for editor preview mode and site preferences such as theme. Advertising cookies are not used.</p>
        <h2>External links</h2>
        <p>Links to the portfolio, social networks, and other services are governed by those services’ privacy policies.</p>
        <h2>Questions</h2>
        <p>For a privacy or data request, use the contact page linked from the portfolio.</p>
      </div>
    </main>
  );
}
