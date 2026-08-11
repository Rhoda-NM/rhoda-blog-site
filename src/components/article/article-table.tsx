import type { PortableTextBlock } from "@portabletext/types";
import type { PortableTextComponents } from "next-sanity";
import { PortableText } from "next-sanity";

export type ArticleTableCell = {
  _key?: string;
  _type?: "cell";
  value?: PortableTextBlock[];
};

export type ArticleTableRow = {
  _key?: string;
  _type?: "row";
  cells?: ArticleTableCell[];
};

export type ArticleTable = {
  _key?: string;
  _type: "table";
  headerRows?: number;
  rows?: ArticleTableRow[];
  caption?: string;
  firstColumnHeader?: boolean;
};

const cellComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    ),
  },
};

function TableCellContent({ cell }: { cell: ArticleTableCell }) {
  if (!cell.value?.length) {
    return null;
  }

  return <PortableText value={cell.value} components={cellComponents} />;
}

export function ArticleTable({ value }: { value: ArticleTable }) {
  const rows = value.rows ?? [];

  if (!rows.length) {
    return null;
  }

  const headerRows = Math.max(
    0,
    Math.min(value.headerRows ?? 0, rows.length),
  );
  const head = rows.slice(0, headerRows);
  const body = rows.slice(headerRows);

  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          {head.length > 0 && (
            <thead className="bg-surface-muted">
              {head.map((row, rowIndex) => (
                <tr
                  key={row._key ?? `head-${rowIndex}`}
                  className="border-b border-border"
                >
                  {(row.cells ?? []).map((cell, cellIndex) => (
                    <th
                      key={cell._key ?? `head-${rowIndex}-${cellIndex}`}
                      scope="col"
                      className="px-4 py-3 align-top font-semibold text-foreground"
                    >
                      <TableCellContent cell={cell} />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}

          <tbody>
            {body.map((row, rowIndex) => (
              <tr
                key={row._key ?? `row-${rowIndex}`}
                className="border-b border-border last:border-b-0"
              >
                {(row.cells ?? []).map((cell, cellIndex) => {
                  const isRowHeader = value.firstColumnHeader && cellIndex === 0;
                  const CellTag = isRowHeader ? "th" : "td";

                  return (
                    <CellTag
                      key={cell._key ?? `cell-${rowIndex}-${cellIndex}`}
                      {...(isRowHeader ? { scope: "row" } : {})}
                      className={`px-4 py-3 align-top leading-6 ${
                        isRowHeader
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <TableCellContent cell={cell} />
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {value.caption && (
        <figcaption className="mt-2.5 text-sm leading-6 text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
