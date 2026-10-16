import { put, list } from "@vercel/blob";

export type Order = {
  id: string;
  name: string;
  city: string;
  phone: string;
  message: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: number;
  userAgent?: string;
};

const PREFIX = "orders/";

function newId(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `OUR-${t}-${r}`;
}

export async function saveOrder(
  input: Omit<Order, "id" | "createdAt">
): Promise<Order> {
  const order: Order = {
    ...input,
    id: newId(),
    createdAt: Date.now(),
  };

  // One blob per order, sortable by creation timestamp (desc first).
  const invertedTs = (10_000_000_000_000 - order.createdAt)
    .toString()
    .padStart(13, "0");
  const pathname = `${PREFIX}${invertedTs}-${order.id}.json`;

  await put(pathname, JSON.stringify(order), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  });

  return order;
}

export async function listOrders(limit = 500): Promise<Order[]> {
  const { blobs } = await list({ prefix: PREFIX, limit });

  const orders = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(b.url, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as Order;
      } catch {
        return null;
      }
    })
  );

  return orders
    .filter((o): o is Order => !!o)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function orderStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalCopies = orders.reduce((s, o) => s + o.quantity, 0);
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  return { totalOrders, totalCopies, totalRevenue, avgOrder };
}
