// src/components/portable-text/FlowDiagram.tsx

import { ArrowDown } from "lucide-react";

type FlowStep = {
  _key: string;
  label: string;
  description?: string;
};

export type FlowDiagramValue = {
  _type: "flowDiagram";
  title?: string;
  steps?: FlowStep[];
  caption?: string;
};

type FlowDiagramProps = {
  value: FlowDiagramValue;
};

export function FlowDiagram({ value }: FlowDiagramProps) {
  const steps = value.steps ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <figure className="my-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-7 dark:border-white/10 dark:bg-white/[0.03]">
      {value.title ? (
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-zinc-600 dark:text-zinc-400">
          {value.title}
        </h3>
      ) : null}

      <ol
        className="mx-auto flex max-w-2xl flex-col items-center"
        aria-label={value.title || "Process flow"}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step._key}
              className="flex w-full flex-col items-center"
            >
              <div className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
                <p className="font-medium text-zinc-950 dark:text-zinc-100">
                  {step.label}
                </p>

                {step.description ? (
                  <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                ) : null}
              </div>

              {!isLast ? (
                <ArrowDown
                  aria-hidden="true"
                  className="my-2.5 size-5 text-zinc-400"
                  strokeWidth={1.75}
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      {value.caption ? (
        <figcaption className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}