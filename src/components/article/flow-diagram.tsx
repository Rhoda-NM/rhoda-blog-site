// src/components/article/flow-diagram.tsx

import { Fragment } from "react";
import { ArrowDown, GitBranch } from "lucide-react";

type FlowStep = {
  _type?: "flowStep" | "nestedFlowStep";
  _key?: string;
  label?: string;
  description?: string;
  connectorLabel?: string;
};

type FlowBranch = {
  _type?: "flowBranch";
  _key?: string;
  label?: string;
  steps?: FlowStep[];
};

type FlowBranchGroup = {
  _type: "flowBranchGroup";
  _key?: string;
  label?: string;
  branches?: FlowBranch[];
  connectorLabel?: string;
};

type FlowItem = FlowStep | FlowBranchGroup;

export type ArticleFlowDiagram = {
  _type: "flowDiagram";
  _key?: string;
  title?: string;
  items?: FlowItem[];
  caption?: string;

  /**
   * Supports flow diagrams created with the previous schema.
   * Existing articles will keep rendering until they are migrated.
   */
  steps?: FlowStep[];
};

function Connector({ label }: { label?: string }) {
  return (
    <div
      className="flex min-h-8 flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-2.5 w-px bg-border" />

      {label ? (
        <span className="my-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}

      <ArrowDown
        className="size-3.5 text-muted-foreground"
        strokeWidth={1.75}
      />
    </div>
  );
}

function StepNode({
  step,
  nested = false,
}: {
  step: FlowStep;
  nested?: boolean;
}) {
  if (!step.label) {
    return null;
  }

  return (
    <div
      className={[
        "w-full rounded-lg border border-border bg-surface text-center",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        nested
          ? "px-3 py-2"
          : "mx-auto max-w-lg px-4 py-2.5",
      ].join(" ")}
    >
      <p
        className={
          nested
            ? "text-xs font-medium leading-5 text-foreground"
            : "text-sm font-medium leading-5 text-foreground"
        }
      >
        {step.label}
      </p>

      {step.description ? (
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {step.description}
        </p>
      ) : null}
    </div>
  );
}

function BranchGroup({
  group,
}: {
  group: FlowBranchGroup;
}) {
  const branches =
    group.branches?.filter(
      (branch) => branch.steps?.some((step) => step.label),
    ) ?? [];

  if (branches.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      {group.label ? (
        <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
          <GitBranch
            className="size-3.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span>{group.label}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {branches.map((branch, branchIndex) => {
          const steps =
            branch.steps?.filter((step) => step.label) ?? [];

          return (
            <div
              key={
                branch._key ??
                `${branch.label ?? "branch"}-${branchIndex}`
              }
              className="rounded-xl border border-border bg-background/40 p-3"
            >
              {branch.label ? (
                <p className="mb-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {branch.label}
                </p>
              ) : null}

              <ol aria-label={branch.label || "Flow branch"}>
                {steps.map((step, stepIndex) => {
                  const isLast =
                    stepIndex === steps.length - 1;

                  return (
                    <li
                      key={
                        step._key ??
                        `${step.label}-${stepIndex}`
                      }
                    >
                      <StepNode step={step} nested />

                      {!isLast ? (
                        <Connector
                          label={step.connectorLabel}
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function isBranchGroup(
  item: FlowItem,
): item is FlowBranchGroup {
  return item._type === "flowBranchGroup";
}

export function FlowDiagram({
  value,
}: {
  value: ArticleFlowDiagram;
}) {
  /*
   * Fall back to the previous `steps` structure so existing
   * published diagrams continue to render.
   */
  const items: FlowItem[] =
    value.items?.length
      ? value.items
      : value.steps?.map((step) => ({
          ...step,
          _type: "flowStep" as const,
        })) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-surface-muted/70 px-4 py-5 sm:px-5">
      {value.title ? (
        <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {value.title}
        </h3>
      ) : null}

      <div className="mx-auto max-w-3xl">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment
              key={
                item._key ??
                `${item._type ?? "step"}-${index}`
              }
            >
              {isBranchGroup(item) ? (
                <BranchGroup group={item} />
              ) : (
                <StepNode step={item} />
              )}

              {!isLast ? (
                <Connector
                  label={item.connectorLabel}
                />
              ) : null}
            </Fragment>
          );
        })}
      </div>

      {value.caption ? (
        <figcaption className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}