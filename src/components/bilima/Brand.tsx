import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BilimaMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand font-display text-base font-bold text-brand-foreground",
        className,
      )}
      aria-hidden
    >
      B
    </span>
  );
}

export function BrandLock({ subtitle }: { subtitle?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <BilimaMark />
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight">Bilima</span>
        {subtitle ? (
          <span className="block text-[11px] font-medium text-muted-foreground">{subtitle}</span>
        ) : null}
      </span>
    </Link>
  );
}
