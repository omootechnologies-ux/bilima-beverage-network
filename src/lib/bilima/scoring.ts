import { PRODUCTS, SUPPLIERS } from "./catalogue";
import type { District, Product, Quote, Rfq, Supplier } from "./types";

/**
 * Deterministic Bilima Score (0-100). No AI, no randomness — every input is a
 * measured operational metric so the number can be explained to a supplier.
 */
export function bilimaScore(s: Supplier): number {
  const responseScore = Math.max(0, 1 - s.avgResponseMinutes / 240);
  const raw =
    s.fulfilmentRate * 30 +
    s.onTimeRate * 22 +
    (1 - s.cancellationRate) * 12 +
    responseScore * 12 +
    (s.buyerRating / 5) * 14 +
    s.stockAccuracy * 10;
  return Math.round(raw);
}

export function scoreBreakdown(s: Supplier) {
  return [
    { label: "Fulfilment rate", value: `${Math.round(s.fulfilmentRate * 100)}%`, weight: 30 },
    { label: "On-time delivery", value: `${Math.round(s.onTimeRate * 100)}%`, weight: 22 },
    { label: "Cancellation rate", value: `${Math.round(s.cancellationRate * 100)}%`, weight: 12 },
    { label: "Quote response time", value: `${s.avgResponseMinutes} min`, weight: 12 },
    { label: "Buyer ratings", value: `${s.buyerRating.toFixed(1)}/5`, weight: 14 },
    { label: "Stock accuracy", value: `${Math.round(s.stockAccuracy * 100)}%`, weight: 10 },
  ];
}

/** Suppliers that deliver to the district and stock at least one requested category. */
export function matchSuppliers(rfq: Rfq): Supplier[] {
  const categories = new Set(rfq.items.map((i) => i.category));
  return SUPPLIERS.filter((s) => {
    if (!s.deliveryAreas.includes(rfq.district)) return false;
    return PRODUCTS.some(
      (p) => p.supplierId === s.id && p.active && categories.has(p.category),
    );
  }).sort((a, b) => bilimaScore(b) - bilimaScore(a));
}

function pickProduct(
  supplierId: string,
  category: Product["category"],
  brand: string | undefined,
  quantity: number,
): Product | undefined {
  const pool = PRODUCTS.filter(
    (p) =>
      p.supplierId === supplierId &&
      p.active &&
      p.category === category &&
      p.stock >= quantity &&
      p.moq <= quantity,
  );
  if (pool.length === 0) return undefined;
  const branded = brand
    ? pool.filter((p) => p.brand.toLowerCase().includes(brand.toLowerCase()))
    : [];
  const source = branded.length > 0 ? branded : pool;
  return source.reduce((a, b) => (a.unitPrice <= b.unitPrice ? a : b));
}

function deliveryFee(s: Supplier, district: District, subtotal: number): number {
  const local = s.district === district;
  const base = local ? 25000 : 45000;
  const volume = Math.round(subtotal * 0.012);
  return base + Math.min(volume, 60000);
}

/**
 * Generates the quotations that matched suppliers can fulfil, from their real
 * catalogue prices and stock. Suppliers that cannot cover every line are skipped.
 */
export function generateQuotes(rfq: Rfq, now = new Date()): Quote[] {
  const quotes: Quote[] = [];
  for (const supplier of matchSuppliers(rfq)) {
    const lines = [];
    let ok = true;
    for (const item of rfq.items) {
      const product = pickProduct(supplier.id, item.category, item.brand, item.quantity);
      if (!product) {
        ok = false;
        break;
      }
      lines.push({
        rfqItemId: item.id,
        productId: product.id,
        productName: `${product.brand} ${product.name}`,
        quantity: item.quantity,
        unitPrice: product.unitPrice,
      });
    }
    if (!ok || lines.length === 0) continue;

    const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
    if (subtotal < supplier.minOrderValue) continue;

    const etaHours = supplier.district === rfq.district ? 8 : 24;
    quotes.push({
      id: `qte-${rfq.id}-${supplier.id}`,
      rfqId: rfq.id,
      supplierId: supplier.id,
      lines,
      deliveryFee: deliveryFee(supplier, rfq.district, subtotal),
      etaHours: Math.round(etaHours + supplier.avgResponseMinutes / 60),
      paymentTerms: supplier.paymentTerms,
      expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 48).toISOString(),
      status: "submitted",
      createdAt: new Date(now.getTime() + supplier.avgResponseMinutes * 60000).toISOString(),
    });
  }
  return quotes;
}

export function quoteTotal(q: Quote): number {
  return q.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0) + q.deliveryFee;
}

export type QuoteTag = "Best Match" | "Lowest Price" | "Fastest Delivery";

/** Deterministic ranking: 55% price, 30% Bilima Score, 15% delivery speed. */
export function rankQuotes(quotes: Quote[]): { quote: Quote; tags: QuoteTag[]; rank: number }[] {
  if (quotes.length === 0) return [];
  const totals = quotes.map(quoteTotal);
  const minTotal = Math.min(...totals);
  const maxTotal = Math.max(...totals);
  const etas = quotes.map((q) => q.etaHours);
  const minEta = Math.min(...etas);
  const maxEta = Math.max(...etas);
  const norm = (v: number, lo: number, hi: number) => (hi === lo ? 1 : 1 - (v - lo) / (hi - lo));

  const scored = quotes.map((q) => {
    const supplier = SUPPLIERS.find((s) => s.id === q.supplierId)!;
    const rank =
      norm(quoteTotal(q), minTotal, maxTotal) * 55 +
      (bilimaScore(supplier) / 100) * 30 +
      norm(q.etaHours, minEta, maxEta) * 15;
    return { quote: q, rank: Math.round(rank * 10) / 10, tags: [] as QuoteTag[] };
  });

  const cheapest = scored.reduce((a, b) => (quoteTotal(a.quote) <= quoteTotal(b.quote) ? a : b));
  const fastest = scored.reduce((a, b) => (a.quote.etaHours <= b.quote.etaHours ? a : b));
  const best = scored.reduce((a, b) => (a.rank >= b.rank ? a : b));
  cheapest.tags.push("Lowest Price");
  fastest.tags.push("Fastest Delivery");
  if (!best.tags.includes("Lowest Price")) best.tags.unshift("Best Match");
  else best.tags.unshift("Best Match");

  return scored.sort((a, b) => b.rank - a.rank);
}
