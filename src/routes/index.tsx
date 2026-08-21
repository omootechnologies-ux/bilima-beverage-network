import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ClipboardList,
  MessageCircle,
  Repeat2,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { BrandLock } from "@/components/bilima/Brand";
import { Button } from "@/components/ui/button";
import { SUPPLIERS } from "@/lib/bilima/catalogue";
import { bilimaScore } from "@/lib/bilima/scoring";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bilima — Buy Beverages Smarter | B2B Procurement Tanzania" },
      {
        name: "description",
        content:
          "Bilima connects Tanzanian businesses with verified beverage suppliers, competitive B2B prices and reliable delivery. Send one request, compare quotes, order.",
      },
      { property: "og:title", content: "Bilima — Buy Beverages Smarter" },
      {
        property: "og:description",
        content:
          "B2B beverage procurement and distribution for Tanzanian businesses. One request. Multiple verified suppliers. Best price.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell Bilima what you need",
    body: "One procurement request: products, quantities, delivery area and date. No calling five suppliers.",
  },
  {
    icon: Users,
    title: "Verified suppliers quote",
    body: "We match your request to suppliers who stock it, deliver to you and meet your volume.",
  },
  {
    icon: BarChart3,
    title: "Compare and award",
    body: "Price, stock, delivery time and Bilima Score side by side. Accept, reject or negotiate.",
  },
  {
    icon: Truck,
    title: "Delivery and proof",
    body: "A logistics partner is assigned, you track it, and delivery is confirmed with proof.",
  },
];

function Landing() {
  const verified = SUPPLIERS.filter((s) => s.verified);
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <BrandLock subtitle="B2B Beverage Procurement" />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/get-started" search={{ role: "supplier" }}>
                Become a supplier
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/get-started" search={{ role: "buyer" }}>
                Start buying
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="border-b bg-surface">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
              <ShieldCheck className="size-3.5" /> Dar es Salaam · Tanzania
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold md:text-5xl">
              Buy Beverages Smarter.
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              Bilima connects businesses with verified beverage suppliers, competitive B2B prices
              and reliable delivery.
            </p>
            <p className="mt-3 max-w-lg text-sm font-medium">
              Tell Bilima what your business needs. We find the best supplier, price and delivery.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="h-12">
                <Link to="/get-started" search={{ role: "buyer" }}>
                  Start Buying <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link to="/get-started" search={{ role: "supplier" }}>
                  Become a Supplier
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Procurement request
            </p>
            <div className="mt-3 space-y-2 text-sm">
              {[
                "30 cartons bottled water",
                "20 cartons soda",
                "10 cartons energy drinks",
              ].map((line) => (
                <div key={line} className="rounded-md border bg-surface px-3 py-2 font-medium">
                  {line}
                </div>
              ))}
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="rounded-md border px-2 py-1">Deliver: Kinondoni</span>
                <span className="rounded-md border px-2 py-1">Required: Tomorrow</span>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Quotes received
              </p>
              <table className="num mt-2 w-full text-sm">
                <tbody>
                  {[
                    ["Bahari Drinks", "TZS 1,240,000", "Today", 98],
                    ["Mbezi Beverage Hub", "TZS 1,225,000", "Tomorrow", 91],
                    ["Kilimanjaro Dist.", "TZS 1,250,000", "Today", 96],
                  ].map(([name, price, when, score]) => (
                    <tr key={String(name)} className="border-b last:border-0">
                      <td className="py-2 pr-2 font-medium">{name}</td>
                      <td className="py-2 pr-2">{price}</td>
                      <td className="py-2 pr-2 text-muted-foreground">{when}</td>
                      <td className="py-2 text-right font-semibold text-brand">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="font-display text-2xl font-bold">How Bilima works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-lg border bg-card p-5">
              <s.icon className="size-5 text-brand" />
              <p className="mt-3 text-xs font-semibold text-muted-foreground">STEP {i + 1}</p>
              <p className="mt-1 font-display text-base font-semibold">{s.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-surface">
        <div className="section container-page grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-xl font-bold">For businesses</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "One request reaches every relevant supplier",
                "Compare price, stock, delivery time and reliability",
                "Repeat orders in one tap with the reorder engine",
                "Procurement analytics: spend, price changes, savings",
                "Delivery tracking with proof of delivery",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-5">
              <Link to="/get-started" search={{ role: "buyer" }}>
                Start buying
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-xl font-bold">For suppliers</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "Live demand from verified businesses in your delivery area",
                "Quote directly, no cold calling",
                "Manage catalogue, pricing and stock in one place",
                "Build a Bilima Score that wins you more orders",
                "Analytics on win rate, top buyers and demand trends",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/get-started" search={{ role: "supplier" }}>
                Become a supplier
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="font-display text-2xl font-bold">Verified supplier network</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every supplier is checked on business registration, TIN, contact, delivery capability and
          payment details before they can quote.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {verified.map((s) => (
            <div key={s.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-sm font-semibold">{s.name}</p>
                <span className="num rounded-md bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand">
                  {bilimaScore(s)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {s.type} · {s.district}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                <BadgeCheck className="size-3.5" /> Bilima Verified
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-surface">
        <div className="section container-page grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Delivery network", body: "Independent logistics partners pick up, deliver and confirm with proof of delivery. Bilima owns no vehicles." },
            { icon: BarChart3, title: "Procurement intelligence", body: "Spend by category and supplier, price movements, order frequency and measured savings." },
            { icon: Repeat2, title: "Reorder engine", body: "Bilima learns your buying rhythm and tells you when your usual order is due." },
          ].map((c) => (
            <div key={c.title} className="rounded-lg border bg-card p-5">
              <c.icon className="size-5 text-brand" />
              <p className="mt-3 font-display text-base font-semibold">{c.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-page">
        <div className="rounded-xl border bg-card p-8 text-center">
          <MessageCircle className="mx-auto size-6 text-brand" />
          <h2 className="mt-3 font-display text-2xl font-bold">
            Ready to run procurement through Bilima?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Set up your business profile and send your first procurement request in under three
            minutes.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/get-started" search={{ role: "buyer" }}>
                Start Buying
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/get-started" search={{ role: "supplier" }}>
                Become a Supplier
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t bg-surface">
        <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <BrandLock subtitle="B2B Beverage Procurement · Tanzania" />
          <p>© {new Date().getFullYear()} Bilima. Prices in TZS.</p>
        </div>
      </footer>
    </div>
  );
}
