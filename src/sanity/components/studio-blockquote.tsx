import type { ReactNode } from "react";

type StudioBlockquoteProps = {
  children?: ReactNode;
};

/**
 * Sanity 6.6's default blockquote preview wraps editor block content in a
 * paragraph. Portable Text may supply a block-level editing container there,
 * producing invalid <p><div> markup in React 19. Keep the semantic blockquote
 * while allowing the editor container to remain a valid direct child.
 */
export function StudioBlockquote({ children }: StudioBlockquoteProps) {
  return (
    <blockquote
      style={{
        borderLeft: "3px solid var(--card-border-color)",
        margin: 0,
        paddingLeft: "0.75rem",
      }}
    >
      {children}
    </blockquote>
  );
}
