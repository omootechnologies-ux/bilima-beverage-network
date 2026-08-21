export function tzs(value: number): string {
  return `TZS ${Math.round(value).toLocaleString("en-US")}`;
}

export function tzsCompact(value: number): string {
  if (value >= 1_000_000) return `TZS ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `TZS ${Math.round(value / 1_000)}K`;
  return `TZS ${value}`;
}

export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

export function dateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function eta(hours: number): string {
  if (hours <= 12) return "Today";
  if (hours <= 30) return "Tomorrow";
  return `${Math.ceil(hours / 24)} days`;
}

export function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
