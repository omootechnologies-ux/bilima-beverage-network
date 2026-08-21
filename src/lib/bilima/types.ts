// Domain model for Bilima. These interfaces mirror the planned Postgres schema
// (users, businesses, products, rfqs, quotations, orders, deliveries, ...) so the
// storage layer can be swapped for Lovable Cloud without touching the UI.

export type Role = "buyer" | "supplier" | "logistics" | "admin";

export type BusinessType =
  | "Restaurant"
  | "Hotel"
  | "Bar"
  | "Cafe"
  | "Supermarket"
  | "Mini-market"
  | "Office"
  | "Event company"
  | "Caterer"
  | "Distributor";

export type Category =
  | "Bottled Water"
  | "Soft Drinks"
  | "Energy Drinks"
  | "Juices"
  | "Sports Drinks"
  | "Malt Drinks"
  | "Functional Drinks"
  | "Other Non-Alcoholic";

export const CATEGORIES: Category[] = [
  "Bottled Water",
  "Soft Drinks",
  "Energy Drinks",
  "Juices",
  "Sports Drinks",
  "Malt Drinks",
  "Functional Drinks",
  "Other Non-Alcoholic",
];

export const DISTRICTS = [
  "Kinondoni",
  "Ilala",
  "Temeke",
  "Ubungo",
  "Kigamboni",
] as const;

export type District = (typeof DISTRICTS)[number];

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;
  district: District;
  address: string;
  tin?: string;
  paymentMethod: "Mobile Money" | "Bank transfer" | "Cash on delivery";
  monthlySpend: number;
  categories: Category[];
  onboarded: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  type: "Manufacturer" | "Wholesaler" | "Distributor" | "Importer";
  district: District;
  deliveryAreas: District[];
  verified: boolean;
  /** Bilima Score 0-100, derived from the metrics below. */
  fulfilmentRate: number; // 0-1
  onTimeRate: number; // 0-1
  cancellationRate: number; // 0-1
  avgResponseMinutes: number;
  buyerRating: number; // 0-5
  stockAccuracy: number; // 0-1
  paymentTerms: string;
  minOrderValue: number;
}

export interface Product {
  id: string;
  supplierId: string;
  name: string;
  brand: string;
  category: Category;
  packaging: string;
  unitsPerCarton: number;
  sku: string;
  unitPrice: number; // TZS per carton
  moq: number;
  stock: number;
  active: boolean;
}

export interface RfqItem {
  id: string;
  category: Category;
  brand?: string;
  quantity: number;
  unit: "Carton" | "Crate" | "Pack" | "Piece";
  maxBudget?: number;
}

export type RfqStatus = "open" | "quoted" | "awarded" | "closed";

export interface Rfq {
  id: string;
  reference: string;
  buyerId: string;
  items: RfqItem[];
  district: District;
  deliveryAddress: string;
  requiredDate: string;
  notes?: string;
  status: RfqStatus;
  createdAt: string;
  invitedSupplierIds: string[];
}

export interface QuoteLine {
  rfqItemId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export type QuoteStatus = "submitted" | "accepted" | "rejected" | "negotiating";

export interface Quote {
  id: string;
  rfqId: string;
  supplierId: string;
  lines: QuoteLine[];
  deliveryFee: number;
  etaHours: number;
  paymentTerms: string;
  expiresAt: string;
  notes?: string;
  status: QuoteStatus;
  createdAt: string;
}

export type OrderStatus =
  | "Confirmed"
  | "Processing"
  | "Ready"
  | "Dispatched"
  | "Delivered"
  | "Completed"
  | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Processing"
  | "Paid"
  | "Failed"
  | "Refunded";

export type DeliveryStatus =
  | "Pending"
  | "Assigned"
  | "Picked Up"
  | "In Transit"
  | "Delivered";

export interface Order {
  id: string;
  reference: string;
  buyerId: string;
  supplierId: string;
  rfqId: string;
  quoteId: string;
  lines: QuoteLine[];
  deliveryFee: number;
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  deliveryStatus: DeliveryStatus;
  district: District;
  deliveryAddress: string;
  createdAt: string;
  /** Cheapest-vs-chosen benchmark captured at award time, in TZS. */
  savings: number;
}

export interface Notification {
  id: string;
  role: Role;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface Dispute {
  id: string;
  orderId: string;
  reason: string;
  detail: string;
  status: "Open" | "Investigating" | "Resolved" | "Closed";
  createdAt: string;
}

export interface BilimaState {
  role: Role;
  business: Business | null;
  rfqs: Rfq[];
  quotes: Quote[];
  orders: Order[];
  notifications: Notification[];
  disputes: Dispute[];
  favouriteSupplierIds: string[];
}
