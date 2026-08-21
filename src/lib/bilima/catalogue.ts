import type { Product, Supplier } from "./types";

/**
 * Reference supplier network + catalogue for Dar es Salaam.
 * Replaced by the `suppliers` / `products` tables once Cloud is enabled.
 */
export const SUPPLIERS: Supplier[] = [
  {
    id: "sup-kilimanjaro",
    name: "Kilimanjaro Beverage Distributors",
    type: "Distributor",
    district: "Ilala",
    deliveryAreas: ["Ilala", "Kinondoni", "Ubungo", "Temeke"],
    verified: true,
    fulfilmentRate: 0.97,
    onTimeRate: 0.95,
    cancellationRate: 0.02,
    avgResponseMinutes: 35,
    buyerRating: 4.8,
    stockAccuracy: 0.96,
    paymentTerms: "50% deposit, balance on delivery",
    minOrderValue: 150000,
  },
  {
    id: "sup-msasani",
    name: "Msasani Wholesale Supplies",
    type: "Wholesaler",
    district: "Kinondoni",
    deliveryAreas: ["Kinondoni", "Ubungo"],
    verified: true,
    fulfilmentRate: 0.92,
    onTimeRate: 0.89,
    cancellationRate: 0.05,
    avgResponseMinutes: 70,
    buyerRating: 4.4,
    stockAccuracy: 0.9,
    paymentTerms: "Cash on delivery",
    minOrderValue: 80000,
  },
  {
    id: "sup-bahari",
    name: "Bahari Drinks Manufacturing",
    type: "Manufacturer",
    district: "Temeke",
    deliveryAreas: ["Temeke", "Ilala", "Kigamboni", "Kinondoni"],
    verified: true,
    fulfilmentRate: 0.99,
    onTimeRate: 0.97,
    cancellationRate: 0.01,
    avgResponseMinutes: 25,
    buyerRating: 4.9,
    stockAccuracy: 0.98,
    paymentTerms: "Net 14 for verified buyers",
    minOrderValue: 300000,
  },
  {
    id: "sup-uhuru",
    name: "Uhuru Trading Importers",
    type: "Importer",
    district: "Ilala",
    deliveryAreas: ["Ilala", "Temeke", "Kigamboni"],
    verified: false,
    fulfilmentRate: 0.85,
    onTimeRate: 0.8,
    cancellationRate: 0.09,
    avgResponseMinutes: 140,
    buyerRating: 4.0,
    stockAccuracy: 0.82,
    paymentTerms: "100% upfront",
    minOrderValue: 60000,
  },
  {
    id: "sup-mbezi",
    name: "Mbezi Beverage Hub",
    type: "Wholesaler",
    district: "Ubungo",
    deliveryAreas: ["Ubungo", "Kinondoni", "Ilala"],
    verified: true,
    fulfilmentRate: 0.94,
    onTimeRate: 0.92,
    cancellationRate: 0.03,
    avgResponseMinutes: 50,
    buyerRating: 4.6,
    stockAccuracy: 0.93,
    paymentTerms: "Cash on delivery / Mobile money",
    minOrderValue: 100000,
  },
];

interface Seed {
  supplierId: string;
  name: string;
  brand: string;
  category: Product["category"];
  packaging: string;
  unitsPerCarton: number;
  unitPrice: number;
  moq: number;
  stock: number;
}

const SEED: Seed[] = [
  { supplierId: "sup-kilimanjaro", name: "Still Water 500ml", brand: "Kilimanjaro", category: "Bottled Water", packaging: "500ml PET", unitsPerCarton: 24, unitPrice: 7800, moq: 10, stock: 1400 },
  { supplierId: "sup-kilimanjaro", name: "Cola 350ml", brand: "Coca-Cola", category: "Soft Drinks", packaging: "350ml can", unitsPerCarton: 24, unitPrice: 19500, moq: 5, stock: 620 },
  { supplierId: "sup-kilimanjaro", name: "Energy Drink 250ml", brand: "Azam Energy", category: "Energy Drinks", packaging: "250ml can", unitsPerCarton: 24, unitPrice: 27000, moq: 5, stock: 300 },
  { supplierId: "sup-kilimanjaro", name: "Mango Juice 1L", brand: "Azam", category: "Juices", packaging: "1L tetra", unitsPerCarton: 12, unitPrice: 24000, moq: 5, stock: 410 },
  { supplierId: "sup-msasani", name: "Still Water 500ml", brand: "Uhai", category: "Bottled Water", packaging: "500ml PET", unitsPerCarton: 24, unitPrice: 7300, moq: 20, stock: 900 },
  { supplierId: "sup-msasani", name: "Soda Assorted 300ml", brand: "Pepsi", category: "Soft Drinks", packaging: "300ml glass", unitsPerCarton: 24, unitPrice: 18200, moq: 10, stock: 500 },
  { supplierId: "sup-msasani", name: "Malt Drink 330ml", brand: "Malta Guinness", category: "Malt Drinks", packaging: "330ml can", unitsPerCarton: 24, unitPrice: 31000, moq: 5, stock: 180 },
  { supplierId: "sup-bahari", name: "Still Water 500ml", brand: "Bahari Pure", category: "Bottled Water", packaging: "500ml PET", unitsPerCarton: 24, unitPrice: 7100, moq: 30, stock: 5200 },
  { supplierId: "sup-bahari", name: "Sparkling Water 500ml", brand: "Bahari Pure", category: "Bottled Water", packaging: "500ml glass", unitsPerCarton: 24, unitPrice: 12500, moq: 10, stock: 800 },
  { supplierId: "sup-bahari", name: "Citrus Soda 500ml", brand: "Bahari", category: "Soft Drinks", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 16800, moq: 20, stock: 2100 },
  { supplierId: "sup-bahari", name: "Isotonic Sports 500ml", brand: "Bahari Active", category: "Sports Drinks", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 29500, moq: 5, stock: 260 },
  { supplierId: "sup-bahari", name: "Vitamin Water 500ml", brand: "Bahari Plus", category: "Functional Drinks", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 33000, moq: 5, stock: 140 },
  { supplierId: "sup-uhuru", name: "Imported Energy 250ml", brand: "Red Bull", category: "Energy Drinks", packaging: "250ml can", unitsPerCarton: 24, unitPrice: 62000, moq: 3, stock: 90 },
  { supplierId: "sup-uhuru", name: "Orange Juice 1L", brand: "Del Monte", category: "Juices", packaging: "1L tetra", unitsPerCarton: 12, unitPrice: 38000, moq: 5, stock: 120 },
  { supplierId: "sup-uhuru", name: "Iced Tea 500ml", brand: "Lipton", category: "Other Non-Alcoholic", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 22000, moq: 5, stock: 200 },
  { supplierId: "sup-mbezi", name: "Still Water 1.5L", brand: "Uhai", category: "Bottled Water", packaging: "1.5L PET", unitsPerCarton: 12, unitPrice: 9600, moq: 15, stock: 1100 },
  { supplierId: "sup-mbezi", name: "Cola 500ml", brand: "Coca-Cola", category: "Soft Drinks", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 17400, moq: 10, stock: 740 },
  { supplierId: "sup-mbezi", name: "Energy Drink 300ml", brand: "Power Play", category: "Energy Drinks", packaging: "300ml can", unitsPerCarton: 24, unitPrice: 25500, moq: 5, stock: 340 },
  { supplierId: "sup-mbezi", name: "Tropical Juice 500ml", brand: "Azam", category: "Juices", packaging: "500ml PET", unitsPerCarton: 12, unitPrice: 19800, moq: 10, stock: 520 },
  { supplierId: "sup-mbezi", name: "Malt Drink 300ml", brand: "Azam Malt", category: "Malt Drinks", packaging: "300ml can", unitsPerCarton: 24, unitPrice: 28500, moq: 5, stock: 210 },
];

export const PRODUCTS: Product[] = SEED.map((s, i) => ({
  id: `prd-${i + 1}`,
  sku: `BLM-${String(i + 1).padStart(4, "0")}`,
  active: true,
  ...s,
}));

export function supplierById(id: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.id === id);
}

export function productsBySupplier(id: string): Product[] {
  return PRODUCTS.filter((p) => p.supplierId === id);
}
