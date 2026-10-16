"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const UNIT_PRICE = 50;
const AUTHOR_WA_NUMBER = "972533234368";
const AUTHOR_WA_DISPLAY = "+972 53-323-4368";

function buildWhatsAppText(data: {
  name: string;
  city: string;
  phone: string;
  message: string;
  qty: number;
  total: number;
}) {
  const lines = [
    "السلام عليكم،",
    'أودُّ حجزَ نسخة من رواية "العائدة" للمؤلف عرسان سلفيتي.',
    "",
    "📖 الطلب",
    `• العدد: ${data.qty} نسخة`,
    `• الإجمالي: ${data.total} شيكل`,
    `• الدفع: نقداً عند الاستلام`,
    "",
    "👤 معلوماتي",
    `• الاسم: ${data.name.trim()}`,
    `• المدينة: ${data.city.trim()}`,
    `• الهاتف: ${data.phone.trim()}`,
  ];
  if (data.message.trim()) {
    lines.push("", "💬 رسالة:", `"${data.message.trim()}"`);
  }
  lines.push("", "شكراً لكم.");
  return lines.join("\n");
}

export function CheckoutForm() {
  const sp = useSearchParams();
  const qtyFromUrl = Number(sp.get("qty")) || 1;
  const [qty, setQty] = useState<number>(Math.min(99, Math.max(1, qtyFromUrl)));

  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    message: "",
  });

  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);

  const total = useMemo(() => qty * UNIT_PRICE, [qty]);

  const update = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const phoneDigits = form.phone.replace(/\D/g, "").length;
  const errors = {
    name: !form.name.trim(),
    city: !form.city.trim(),
    phone: phoneDigits < 7,
  };
  const hasErrors = errors.name || errors.city || errors.phone;

  const waText = buildWhatsAppText({ ...form, qty, total });
  const waHref = `https://wa.me/${AUTHOR_WA_NUMBER}?text=${encodeURIComponent(waText)}`;

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasErrors) {
      e.preventDefault();
      setShowErrors(true);
      const firstBad = errors.name ? "name" : errors.city ? "city" : "phone";
      const el = document.getElementById(`field-${firstBad}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el?.focus(), 350);
      return;
    }
    // Fire-and-forget order save (survives page navigation to WhatsApp)
    const payload = JSON.stringify({
      name: form.name.trim(),
      city: form.city.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      quantity: qty,
      unitPrice: UNIT_PRICE,
      total,
    });
    try {
      navigator.sendBeacon(
        "/api/order",
        new Blob([payload], { type: "application/json" })
      );
    } catch {
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    setSent(true);
  };

  const fieldClass = (bad: boolean) =>
    `field ${showErrors && bad ? "invalid" : ""}`;

  return (
    <>
      {/* FULL-PAGE SUMMARY HERO */}
      <section className="section relative flex min-h-[calc(100dvh-80px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-sand-300/40 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Big book cover */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotateY: 6 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-none"
            style={{ perspective: 1200 }}
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sand-200/80 via-sand-100/70 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-xl shadow-[0_50px_90px_-25px_rgba(90,67,34,0.55)] ring-1 ring-sand-300/40">
              <Image
                src="/book-cover.jpg"
                alt="غلاف العائدة"
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 768px) 90vw, 42vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Summary info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] text-sand-700 sm:text-sm">ملخّص الطلب</p>
            <h1 className="mt-2 font-[family-name:var(--font-amiri)] text-4xl text-sand-900 sm:text-5xl md:text-6xl">
              العائدة
            </h1>
            <p className="mt-2 text-sand-800">رواية فانتازيا عربية · الجزء الأول</p>
            <p className="mt-1 text-sand-700">بقلم عرسان سلفيتي</p>

            {/* CASH ONLY badge — unmissable */}
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border-2 border-amber-600/40 bg-gradient-to-br from-amber-100 to-amber-200/80 px-5 py-3 shadow-[0_14px_30px_-12px_rgba(166,127,56,0.5)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-700 text-white">
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M6 10h.01M18 14h.01" />
                </svg>
              </div>
              <div>
                <p className="font-[family-name:var(--font-amiri)] text-xl font-bold text-amber-950 sm:text-2xl">
                  الدفع نقداً فقط
                </p>
                <p className="text-xs text-amber-900/90 sm:text-sm">
                  لا يُقبل الدفع الإلكتروني — عند الاستلام من المؤلف
                </p>
              </div>
            </div>

            {/* Price × qty */}
            <div className="mt-7 rounded-2xl border border-sand-300/60 bg-white/70 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs tracking-[0.25em] text-sand-700">سعر النسخة</p>
                  <p className="num-display mt-1 font-[family-name:var(--font-amiri)] text-3xl text-sand-900 sm:text-4xl">
                    50 <span className="text-lg text-sand-700">شيكل</span>
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-xs tracking-[0.25em] text-sand-700">عدد النسخ</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button type="button" onClick={dec} disabled={qty <= 1} aria-label="إنقاص" className="stepper-btn">−</button>
                    <span className="num-display w-10 text-center font-[family-name:var(--font-amiri)] text-2xl text-sand-900 sm:text-3xl">
                      {qty}
                    </span>
                    <button type="button" onClick={inc} disabled={qty >= 99} aria-label="زيادة" className="stepper-btn">+</button>
                  </div>
                </div>
              </div>

              <div className="gold-rule my-5" />

              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-amiri)] text-xl text-sand-900 sm:text-2xl">الإجمالي</p>
                <p className="num-display font-[family-name:var(--font-amiri)] text-3xl font-bold text-sand-900 sm:text-4xl">
                  {total} <span className="text-xl text-sand-700">شيكل</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gold mt-7 w-full sm:w-auto"
            >
              تابع لإتمام الطلب
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* bottom scroll indicator */}
        <motion.button
          type="button"
          onClick={scrollToForm}
          aria-label="تمرير إلى الأسفل"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sand-800 hover:text-sand-900"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5" />
            <path d="M7 7l5 5 5-5" />
          </svg>
        </motion.button>
      </section>

      {/* FORM SECTION */}
      <section id="order-form" className="section mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] text-sand-700">إتمام الحجز</p>
          <h2 className="mt-2 font-[family-name:var(--font-amiri)] text-3xl text-sand-900 sm:text-4xl">
            أكمل بياناتك
          </h2>
          <p className="mt-2 text-sand-800">تُدرَج معلوماتك تلقائياً في رسالة الواتساب للمؤلف.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-10">
          {/* Mini summary — appears on the RIGHT in RTL */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="card-sand md:col-span-2 p-5 sm:p-6"
          >
            <p className="text-xs tracking-[0.3em] text-sand-700">ملخّص</p>
            <div className="mt-4 flex gap-4">
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md ring-1 ring-sand-300/60">
                <Image src="/book-cover.jpg" alt="غلاف العائدة" fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-amiri)] text-2xl text-sand-900">العائدة</h3>
                <p className="text-sm text-sand-800">الجزء الأول</p>
                <p className="mt-1 text-sm text-sand-700">عرسان سلفيتي</p>
              </div>
            </div>

            <div className="gold-rule my-5" />

            <div className="space-y-2 text-sand-900">
              <div className="flex justify-between">
                <span>النسخ</span>
                <span className="num-display">{qty}</span>
              </div>
              <div className="flex justify-between">
                <span>السعر</span>
                <span className="num-display">{UNIT_PRICE} ₪</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>الإجمالي</span>
                <span className="num-display">{total} ₪</span>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border-2 border-amber-600/30 bg-amber-50 p-3">
              <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="text-xs leading-6 text-amber-950">
                <p className="font-bold">نقداً فقط · عند الاستلام</p>
                <p>الاستلامُ شخصيّاً من المؤلف.</p>
              </div>
            </div>
          </motion.aside>

          {/* Form — appears on the LEFT in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-sand md:col-span-3 p-5 sm:p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="field-name" className="mb-1.5 block text-sm text-sand-800">
                  الاسم الكامل <span className="text-rose-700">*</span>
                </label>
                <input
                  id="field-name"
                  className={fieldClass(errors.name)}
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="field-city" className="mb-1.5 block text-sm text-sand-800">
                  المدينة <span className="text-rose-700">*</span>
                </label>
                <input
                  id="field-city"
                  className={fieldClass(errors.city)}
                  type="text"
                  value={form.city}
                  onChange={update("city")}
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="field-phone" className="mb-1.5 block text-sm text-sand-800">
                  رقم الهاتف (واتساب) <span className="text-rose-700">*</span>
                </label>
                <input
                  id="field-phone"
                  className={fieldClass(errors.phone)}
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="field-message" className="mb-1.5 block text-sm text-sand-800">
                  رسالة إلى المؤلف
                </label>
                <textarea
                  id="field-message"
                  className="field min-h-28 resize-y"
                  value={form.message}
                  onChange={update("message")}
                  maxLength={1000}
                />
              </div>
            </div>

            {showErrors && hasErrors ? (
              <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 ring-1 ring-rose-200">
                يُرجى تعبئة جميع الحقول المطلوبة قبل إرسال الطلب.
              </p>
            ) : null}

            {/* CASH ONLY callout before button */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-amber-600/40 bg-gradient-to-br from-amber-100 to-amber-200/70 p-4">
              <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-6 w-6 shrink-0 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M6 10h.01M18 14h.01" />
              </svg>
              <div>
                <p className="font-bold text-amber-950">تنبيه: الدفع نقداً فقط</p>
                <p className="text-sm text-amber-900/95">
                  لا تُقبل البطاقات أو الدفع الإلكتروني. يُسلَّم المبلغُ نقداً للمؤلف عند الاستلام.
                </p>
              </div>
            </div>

            <div className="gold-rule my-7" />

            {/* WhatsApp CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 p-5 ring-1 ring-emerald-200/60">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.8 1.48h.01c6.63 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.21-3.47-8.4z"/></svg>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-amiri)] text-xl text-emerald-950">تأكيد الطلب عبر الواتساب</p>
                  <p className="text-sm text-emerald-900/80">يُحفَظ الطلبُ ثم تُفتَح محادثة مع المؤلف.</p>
                </div>
              </div>

              <a
                href={waHref}
                onClick={handleOrderClick}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-base font-semibold text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.6)] transition hover:brightness-105 hover:shadow-[0_18px_36px_-12px_rgba(37,211,102,0.75)] sm:text-lg"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.8 1.48h.01c6.63 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.21-3.47-8.4z"/></svg>
                <span>{sent ? "تمّ تسجيل الطلب — فتح واتساب…" : "إرسال الطلب الآن عبر الواتساب"}</span>
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </a>

              <p className="mt-3 text-center text-xs text-emerald-900/80" dir="ltr">
                {AUTHOR_WA_DISPLAY}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`tel:+${AUTHOR_WA_NUMBER}`}
                dir="ltr"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sand-300 bg-white/80 px-4 py-3 text-sand-900 transition hover:bg-white"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.37 1.78.72 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.82.35 1.7.59 2.6.72A2 2 0 0 1 22 16.92z"/></svg>
                {AUTHOR_WA_DISPLAY}
              </a>
              <a
                href="mailto:orsan304@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sand-300 bg-white/80 px-4 py-3 text-sand-900 transition hover:bg-white"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
                orsan304@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
