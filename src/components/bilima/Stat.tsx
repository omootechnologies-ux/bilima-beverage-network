import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "brand" | "warning";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4",
        tone === "brand" && "border-brand/25 bg-brand-soft",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      </div>
      <p
        className={cn(
          "num mt-2 font-display text-xl font-bold",
          tone === "brand" && "text-brand",
          tone === "warning" && "text-warning",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-surface px-6 py-12 text-center">
      {icon ? <div className="mb-3 text-muted-foreground">{icon}</div> : null}
      <p className="font-display text-base font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

const TONES: Record<string, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  brand: "bg-brand-soft text-accent-foreground border border-brand/20",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/12 text-warning border border-warning/25",
  danger: "bg-destructive/10 text-destructive border border-destructive/20",
  info: "bg-info/10 text-info border border-info/20",
};

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES | string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        TONES[tone] ?? TONES["neutral"],
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): string {
  switch (status) {
    case "Completed":
    case "Delivered":
    case "Paid":
    case "accepted":
    case "Resolved":
      return "success";
    case "Cancelled":
    case "Failed":
    case "rejected":
    case "Open":
      return "danger";
    case "Pending":
    case "Processing":
    case "negotiating":
    case "Investigating":
      return "warning";
    case "Dispatched":
    case "In Transit":
    case "quoted":
      return "info";
    default:
      return "neutral";
  }
}
