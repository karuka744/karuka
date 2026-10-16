import { cookies } from "next/headers";
import { listOrders, orderStats, type Order } from "@/lib/orders";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { OrdersTable } from "@/components/admin/OrdersTable";

export const instant = false;

function normalizePhoneForWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return "972" + digits.slice(1);
  return digits;
}

export default async function AdminDashboardPage() {
  // Trigger dynamic rendering (middleware already enforces auth)
  await cookies();

  let orders: Order[] = [];
  let loadError: string | null = null;
  try {
    orders = await listOrders();
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err);
  }

  const stats = orderStats(orders);
  const ordersEnriched = orders.map((o) => ({
    ...o,
    waNumber: normalizePhoneForWhatsApp(o.phone),
  }));

  return (
    <div className="relative min-h-screen bg-paper">
      <header className="section relative z-10 border-b border-sand-300/60 bg-white/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-sand-700">لوحة التحكم</p>
            <h1 className="font-[family-name:var(--font-amiri)] text-3xl text-sand-900">
              العائدة · أوامر الطلبات
            </h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <section className="section mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <StatCard label="إجمالي الطلبات" value={stats.totalOrders.toString()} />
          <StatCard label="عدد النسخ المباعة" value={stats.totalCopies.toString()} />
          <StatCard label="الإيرادات (شيكل)" value={stats.totalRevenue.toLocaleString("en")} tone="emerald" />
          <StatCard label="متوسّط الطلب (شيكل)" value={stats.avgOrder.toFixed(0)} />
        </div>

        {loadError ? (
          <p className="mt-8 rounded-xl bg-rose-50 px-4 py-4 text-sm text-rose-900 ring-1 ring-rose-200">
            لم نتمكن من قراءة قائمة الطلبات: {loadError}
          </p>
        ) : null}

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-amiri)] text-2xl text-sand-900">
              الطلبات
            </h2>
            <span className="text-sm text-sand-700">
              {stats.totalOrders > 0
                ? `${stats.totalOrders} طلب`
                : "لا توجد طلبات بعد"}
            </span>
          </div>

          <div className="mt-5">
            <OrdersTable orders={ordersEnriched} />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = "sand",
}: {
  label: string;
  value: string;
  tone?: "sand" | "emerald";
}) {
  const toneClass =
    tone === "emerald"
      ? "from-emerald-50 to-emerald-100/70 ring-emerald-200/60 text-emerald-900"
      : "from-white/80 to-sand-100/60 ring-sand-300/40 text-sand-900";
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${toneClass} p-4 sm:p-5 ring-1`}>
      <p className="text-xs text-current/80 sm:text-sm">{label}</p>
      <p className="num-display mt-1 font-[family-name:var(--font-amiri)] text-3xl sm:text-4xl">
        {value}
      </p>
    </div>
  );
}
