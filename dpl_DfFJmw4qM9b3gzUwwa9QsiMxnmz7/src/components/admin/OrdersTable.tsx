"use client";

import { useMemo, useState } from "react";

type EnrichedOrder = {
  id: string;
  name: string;
  city: string;
  phone: string;
  message: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: number;
  waNumber: string;
};

function fmtDate(ts: number): string {
  try {
    return new Intl.DateTimeFormat("ar", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toISOString();
  }
}

function escapeCsv(v: string | number): string {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function OrdersTable({ orders }: { orders: EnrichedOrder[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return orders;
    return orders.filter((o) =>
      [o.id, o.name, o.city, o.phone, o.message]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [orders, q]);

  const exportCsv = () => {
    const header = [
      "id",
      "created_at",
      "name",
      "city",
      "phone",
      "quantity",
      "unit_price",
      "total",
      "message",
    ].join(",");
    const rows = orders.map((o) =>
      [
        o.id,
        new Date(o.createdAt).toISOString(),
        o.name,
        o.city,
        o.phone,
        o.quantity,
        o.unitPrice,
        o.total,
        o.message,
      ]
        .map(escapeCsv)
        .join(",")
    );
    const csv = "﻿" + [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alaaeda-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث بالاسم، المدينة، الهاتف…"
          className="field max-w-md"
        />
        <button
          type="button"
          onClick={exportCsv}
          disabled={orders.length === 0}
          className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white/70 px-4 py-2 text-sm text-sand-900 transition hover:bg-white disabled:opacity-50"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          تصدير CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sand-300 bg-white/40 p-10 text-center text-sand-700">
          {orders.length === 0
            ? "لم يصلك أيّ طلب بعد. سيظهر هنا كل طلب تلقائياً."
            : "لا توجد نتائج تطابق البحث."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-sand-300/50 bg-white/60 shadow-sm backdrop-blur">
          <table className="w-full min-w-[720px] text-right">
            <thead className="bg-sand-100/80 text-xs uppercase tracking-wider text-sand-800">
              <tr>
                <th className="px-4 py-3 font-semibold">التاريخ</th>
                <th className="px-4 py-3 font-semibold">القارئ</th>
                <th className="px-4 py-3 font-semibold">المدينة</th>
                <th className="px-4 py-3 font-semibold">النسخ</th>
                <th className="px-4 py-3 font-semibold">الإجمالي</th>
                <th className="px-4 py-3 font-semibold">تواصل</th>
                <th className="px-4 py-3 font-semibold">رسالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200/70 text-sm">
              {filtered.map((o) => (
                <tr key={o.id} className="transition hover:bg-sand-100/40">
                  <td className="whitespace-nowrap px-4 py-3 text-sand-800">
                    {fmtDate(o.createdAt)}
                    <br />
                    <span className="text-xs text-sand-600">{o.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sand-900">
                    <span className="font-semibold">{o.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sand-800">{o.city}</td>
                  <td className="px-4 py-3 num-display text-sand-900">{o.quantity}</td>
                  <td className="px-4 py-3 num-display font-semibold text-sand-900">
                    {o.total} ₪
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${o.waNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition hover:brightness-105"
                        title="فتح واتساب"
                      >
                        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.8 1.48h.01c6.63 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.21-3.47-8.4z"/></svg>
                      </a>
                      <a
                        href={`tel:+${o.waNumber}`}
                        dir="ltr"
                        className="text-xs text-sand-800 hover:text-sand-900"
                      >
                        {o.phone}
                      </a>
                    </div>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-sand-700">
                    {o.message ? (
                      <span title={o.message}>
                        {o.message.length > 60 ? o.message.slice(0, 60) + "…" : o.message}
                      </span>
                    ) : (
                      <span className="text-sand-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
