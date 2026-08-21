import { useSyncExternalStore } from "react";
import { generateQuotes, quoteTotal } from "./scoring";
import { uid } from "./format";
import type {
  BilimaState,
  Business,
  Dispute,
  Notification,
  Order,
  Quote,
  Rfq,
  Role,
} from "./types";

const KEY = "bilima.state.v1";

const EMPTY: BilimaState = {
  role: "buyer",
  business: null,
  rfqs: [],
  quotes: [],
  orders: [],
  notifications: [],
  disputes: [],
  favouriteSupplierIds: [],
};

let state: BilimaState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — keep state in memory */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function setState(next: Partial<BilimaState>) {
  state = { ...state, ...next };
  persist();
  emit();
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...(JSON.parse(raw) as BilimaState) };
  } catch {
    /* corrupt payload — start clean */
  }
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useBilima(): BilimaState {
  return useSyncExternalStore(
    subscribe,
    () => {
      hydrate();
      return state;
    },
    () => EMPTY,
  );
}

function notify(role: Role, title: string, body: string) {
  const n: Notification = {
    id: uid("ntf"),
    role,
    title,
    body,
    createdAt: new Date().toISOString(),
    read: false,
  };
  state = { ...state, notifications: [n, ...state.notifications] };
}

/* ---------------------------------- actions --------------------------------- */

export const actions = {
  setRole(role: Role) {
    setState({ role });
  },

  saveBusiness(business: Business) {
    setState({ business });
  },

  reset() {
    state = EMPTY;
    persist();
    emit();
  },

  createRfq(input: Omit<Rfq, "id" | "reference" | "status" | "createdAt" | "invitedSupplierIds" | "buyerId">): Rfq {
    const id = uid("rfq");
    const rfq: Rfq = {
      ...input,
      id,
      buyerId: state.business?.id ?? "buyer-local",
      reference: `RFQ-${id.slice(-6).toUpperCase()}`,
      status: "open",
      createdAt: new Date().toISOString(),
      invitedSupplierIds: [],
    };
    const quotes = generateQuotes(rfq);
    rfq.invitedSupplierIds = quotes.map((q) => q.supplierId);
    rfq.status = quotes.length > 0 ? "quoted" : "open";

    state = {
      ...state,
      rfqs: [rfq, ...state.rfqs],
      quotes: [...quotes, ...state.quotes],
    };
    notify("supplier", "New RFQ received", `${rfq.reference} — ${rfq.items.length} line item(s) for ${rfq.district}.`);
    notify(
      "buyer",
      quotes.length > 0 ? `${quotes.length} quotes received` : "RFQ sent to suppliers",
      `${rfq.reference} was matched with ${rfq.invitedSupplierIds.length} supplier(s).`,
    );
    persist();
    emit();
    return rfq;
  },

  acceptQuote(quote: Quote): Order {
    const rfq = state.rfqs.find((r) => r.id === quote.rfqId);
    const rivals = state.quotes.filter((q) => q.rfqId === quote.rfqId);
    const highest = Math.max(...rivals.map(quoteTotal));
    const subtotal = quote.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
    const total = subtotal + quote.deliveryFee;
    const id = uid("ord");

    const order: Order = {
      id,
      reference: `BLM-${id.slice(-6).toUpperCase()}`,
      buyerId: state.business?.id ?? "buyer-local",
      supplierId: quote.supplierId,
      rfqId: quote.rfqId,
      quoteId: quote.id,
      lines: quote.lines,
      deliveryFee: quote.deliveryFee,
      subtotal,
      total,
      status: "Confirmed",
      paymentStatus: "Pending",
      paymentMethod: state.business?.paymentMethod ?? "Mobile Money",
      deliveryStatus: "Pending",
      district: rfq?.district ?? "Kinondoni",
      deliveryAddress: rfq?.deliveryAddress ?? "",
      createdAt: new Date().toISOString(),
      savings: Math.max(0, highest - total),
    };

    state = {
      ...state,
      orders: [order, ...state.orders],
      quotes: state.quotes.map((q) =>
        q.rfqId === quote.rfqId
          ? { ...q, status: q.id === quote.id ? "accepted" : "rejected" }
          : q,
      ),
      rfqs: state.rfqs.map((r) => (r.id === quote.rfqId ? { ...r, status: "awarded" } : r)),
    };
    notify("supplier", "Quote accepted", `Order ${order.reference} confirmed. Prepare for dispatch.`);
    notify("buyer", "Order confirmed", `${order.reference} is confirmed with your supplier.`);
    persist();
    emit();
    return order;
  },

  rejectQuote(quoteId: string) {
    setState({
      quotes: state.quotes.map((q) => (q.id === quoteId ? { ...q, status: "rejected" } : q)),
    });
  },

  requestNegotiation(quoteId: string, message: string) {
    state = {
      ...state,
      quotes: state.quotes.map((q) =>
        q.id === quoteId ? { ...q, status: "negotiating", notes: message } : q,
      ),
    };
    notify("supplier", "Negotiation requested", message);
    persist();
    emit();
  },

  advanceOrder(orderId: string) {
    const flow: Order["status"][] = [
      "Confirmed",
      "Processing",
      "Ready",
      "Dispatched",
      "Delivered",
      "Completed",
    ];
    const delivery: Record<string, Order["deliveryStatus"]> = {
      Confirmed: "Pending",
      Processing: "Assigned",
      Ready: "Picked Up",
      Dispatched: "In Transit",
      Delivered: "Delivered",
      Completed: "Delivered",
    };
    setState({
      orders: state.orders.map((o) => {
        if (o.id !== orderId) return o;
        const idx = flow.indexOf(o.status);
        if (idx < 0 || idx === flow.length - 1) return o;
        const status = flow[idx + 1]!;
        return { ...o, status, deliveryStatus: delivery[status]! };
      }),
    });
  },

  cancelOrder(orderId: string) {
    setState({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: "Cancelled", deliveryStatus: "Pending" } : o,
      ),
    });
  },

  setPaymentStatus(orderId: string, paymentStatus: Order["paymentStatus"]) {
    setState({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o)),
    });
  },

  setDeliveryStatus(orderId: string, deliveryStatus: Order["deliveryStatus"]) {
    setState({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, deliveryStatus } : o)),
    });
  },

  toggleFavouriteSupplier(supplierId: string) {
    const list = state.favouriteSupplierIds;
    setState({
      favouriteSupplierIds: list.includes(supplierId)
        ? list.filter((id) => id !== supplierId)
        : [...list, supplierId],
    });
  },

  openDispute(orderId: string, reason: string, detail: string): Dispute {
    const dispute: Dispute = {
      id: uid("dsp"),
      orderId,
      reason,
      detail,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    state = { ...state, disputes: [dispute, ...state.disputes] };
    notify("admin", "New dispute opened", `${reason} on order ${orderId}.`);
    persist();
    emit();
    return dispute;
  },

  setDisputeStatus(id: string, status: Dispute["status"]) {
    setState({
      disputes: state.disputes.map((d) => (d.id === id ? { ...d, status } : d)),
    });
  },

  markNotificationsRead(role: Role) {
    setState({
      notifications: state.notifications.map((n) =>
        n.role === role ? { ...n, read: true } : n,
      ),
    });
  },
};
