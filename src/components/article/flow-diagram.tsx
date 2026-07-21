// src/components/article/flow-diagram.tsx

import { ArrowDown } from "lucide-react";

export type ArticleFlowStep = {
  _key?: string;
  label?: string;
  description?: string;
};

export type ArticleFlowDiagram = {
  _type: "flowDiagram";
  _key?: string;
  title?: string;
  steps?: ArticleFlowStep[];
  caption?: string;
};

export function FlowDiagram({
  value,
}: {
  value: ArticleFlowDiagram;
}) {
  const steps = value.steps?.filter((step) => step.label) ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <figure className="not-prose my-10 rounded-2xl border border-border bg-surface-muted p-5 sm:p-7">
      {value.title && (
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {value.title}
        </h3>
      )}

      <ol
        className="mx-auto flex max-w-2xl flex-col items-center"
        aria-label={value.title || "Process flow"}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step._key ?? `${step.label}-${index}`}
              className="flex w-full flex-col items-center"
            >
              <div className="w-full rounded-xl border border-border bg-surface px-5 py-4 text-center shadow-sm">
                <p className="font-medium text-foreground">
                  {step.label}
                </p>

                {step.description && (
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>

              {!isLast && (
                <ArrowDown
                  className="my-2.5 size-5 text-muted-foreground"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {value.caption && (
        <figcaption className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}