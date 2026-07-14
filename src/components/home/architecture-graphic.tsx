export function ArchitectureGraphic() {
  return (
    <div
      aria-hidden="true"
      className="
        relative flex min-h-[16rem] lg:min-h-[18rem] items-center justify-center
        overflow-hidden rounded-[1.1rem]
        border border-border bg-surface-muted
      "
    >
      <div
        className="
          absolute inset-0 opacity-60
          [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]
          [background-size:2rem_2rem]
        "
      />

      <svg
        viewBox="0 0 520 360"
        className="relative h-auto w-full max-w-[32rem] p-7"
        role="presentation"
      >
        <defs>
          <linearGradient id="burgundy-line" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--burgundy-deep)" />
            <stop offset="100%" stopColor="var(--burgundy-soft)" />
          </linearGradient>
        </defs>

        <g
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M260 84v42" />
          <path d="M150 126h220" />
          <path d="M150 126v40" />
          <path d="M370 126v40" />
          <path d="M150 218v34" />
          <path d="M370 218v34" />
          <path d="M150 252h220" />
          <path d="M260 252v32" />
        </g>

        <g>
          <rect
            x="190"
            y="36"
            width="140"
            height="50"
            rx="12"
            fill="var(--surface)"
            stroke="var(--burgundy-soft)"
            strokeWidth="2"
          />
          <text
            x="260"
            y="66"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="14"
            fontFamily="monospace"
          >
            USER
          </text>

          <rect
            x="80"
            y="166"
            width="140"
            height="52"
            rx="12"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="2"
          />
          <text
            x="150"
            y="198"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="14"
            fontFamily="monospace"
          >
            ROLE
          </text>

          <rect
            x="300"
            y="166"
            width="140"
            height="52"
            rx="12"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="2"
          />
          <text
            x="370"
            y="198"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="14"
            fontFamily="monospace"
          >
            SCOPE
          </text>

          <rect
            x="175"
            y="284"
            width="170"
            height="52"
            rx="12"
            fill="var(--surface)"
            stroke="var(--brass)"
            strokeWidth="2"
          />
          <text
            x="260"
            y="316"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="14"
            fontFamily="monospace"
          >
            PERMISSION
          </text>
        </g>

        <circle cx="260" cy="126" r="5" fill="var(--burgundy-soft)" />
        <circle cx="260" cy="252" r="5" fill="var(--brass)" />
      </svg>

      <div className="absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.13em] text-faint-foreground">
        AUTHORIZATION_MODEL
      </div>
    </div>
  );
}