"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        source: window.location.pathname,
      }),
    });
    const result = (await response.json()) as { message?: string };
    setMessage(result.message ?? "Something went wrong. Please try again.");
    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <section className={compact ? "newsletter-signup compact" : "newsletter-signup"}>
      <div>
        <span className="technical-label">Newsletter</span>
        <h2 className="mt-4 text-3xl sm:text-4xl">
          Get new engineering notes when they ship.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          System breakdowns, architecture decisions and practical lessons from real builds. No noise.
        </p>
      </div>
      <form onSubmit={subscribe} className="newsletter-form">
        <label htmlFor={compact ? "newsletter-email-home" : "newsletter-email"} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? "newsletter-email-home" : "newsletter-email"}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="form-input"
        />
        <button type="submit" className="button-primary" disabled={status === "submitting"}>
          {status === "success" ? <Check size={16} /> : <ArrowRight size={16} />}
          {status === "submitting" ? "Joining…" : status === "success" ? "Check your inbox" : "Subscribe"}
        </button>
        {message && (
          <p className="newsletter-message" data-status={status} role="status">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
