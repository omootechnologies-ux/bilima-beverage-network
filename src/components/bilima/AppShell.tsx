import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { BrandLock } from "./Brand";
import { actions, useBilima } from "@/lib/bilima/store";
import type { Role } from "@/lib/bilima/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const NAV: Record<Role, NavItem[]> = {
  buyer: [
    { to: "/dashboard", label: "Home", icon: LayoutDashboard },
    { to: "/rfqs", label: "RFQs", icon: ClipboardList },
    { to: "/orders", label: "Orders", icon: Package },
    { to: "/marketplace", label: "Market", icon: Store },
    { to: "/analytics", label: "Insights", icon: BarChart3 },
  ],
  supplier: [
    { to: "/supplier", label: "Home", icon: LayoutDashboard },
    { to: "/supplier/rfqs", label: "RFQs", icon: ClipboardList },
    { to: "/supplier/products", label: "Products", icon: Package },
    { to: "/supplier/orders", label: "Orders", icon: Truck },
  ],
  logistics: [{ to: "/logistics", label: "Jobs", icon: Truck }],
  admin: [
    { to: "/admin", label: "Overview", icon: ShieldCheck },
    { to: "/admin/suppliers", label: "Suppliers", icon: Building2 },
    { to: "/admin/disputes", label: "Disputes", icon: ClipboardList },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  buyer: "Buyer workspace",
  supplier: "Supplier workspace",
  logistics: "Logistics partner",
  admin: "Bilima operations",
};

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const state = useBilima();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = NAV[state.role];
  const unread = state.notifications.filter((n) => n.role === state.role && !n.read).length;

  return (
    <div className="min-h-screen bg-surface pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between gap-3">
          <BrandLock subtitle={ROLE_LABEL[state.role]} />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === item.to && "bg-brand-soft text-accent-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Bell className="size-4" />
              {unread > 0 ? (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand" />
              ) : null}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  Switch role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Demo workspace</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(Object.keys(NAV) as Role[]).map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onSelect={() => actions.setRole(role)}
                    className={cn(state.role === role && "font-semibold text-brand")}
                  >
                    {ROLE_LABEL[role]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container-page py-5">
        {title ? (
          <h1 className="mb-4 font-display text-xl font-bold tracking-tight md:text-2xl">{title}</h1>
        ) : null}
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background md:hidden">
        <div className="grid grid-cols-5 gap-0.5 px-1 py-1.5" style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }}>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-medium text-muted-foreground",
                  active && "bg-brand-soft text-accent-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
