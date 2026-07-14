"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // avoid calling setState synchronously within the effect to prevent
    // cascading renders; schedule state update asynchronously
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="size-10 rounded-full border border-border"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        inline-flex size-10 items-center justify-center rounded-full
        border border-border bg-surface text-muted-foreground
        transition-colors hover:border-burgundy-soft
        hover:bg-surface-muted hover:text-foreground
      "
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}