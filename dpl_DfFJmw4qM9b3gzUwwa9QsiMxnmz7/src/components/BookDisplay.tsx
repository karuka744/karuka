"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DESCRIPTION_LINES = [
  "في الليلةِ التي يبلغُ فيها السابعةَ عشرة، يختفي عمرو من عالمنا.",
  "يستيقظُ في رُماز، مملكةٍ يُولَد فيها كلُّ إنسانٍ بجوهرةٍ في جبينِه تكشفُ قوّتَه وقَدَرَه.",
  "نبوءةٌ قديمة تقولُ إنّه جاءَ ليُدمّر كلَّ شيء، ومملكةٌ تعرفُ أكثرَ ممّا تبوح، وأسرارٌ مدفونةٌ منذ سنين بدأت تستيقظ.",
  "والسؤالُ الذي لا يجرؤُ أحدٌ على طرحه: ما الذي أحضرَه معه؟",
];

export function BookDisplay() {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const goCheckout = () => {
    router.push(`/checkout?qty=${qty}`);
  };

  return (
    <section className="section relative mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-20">
      <div className="grid grid-cols-1 items-center gap-10 md:gap-14 md:grid-cols-2">
        {/* Book cover */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: 8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-none lg:max-w-xl"
          style={{ perspective: 1200 }}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sand-200/80 via-sand-100/70 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-xl shadow-[0_40px_80px_-20px_rgba(90,67,34,0.5)] ring-1 ring-sand-300/40">
            <Image
              src="/book-cover.jpg"
              alt="غلاف رواية العائدة"
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 90vw, 42vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-sand-800/20 blur-xl"
          />
        </motion.div>

        {/* Description + order card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <p className="text-xs tracking-[0.3em] text-sand-700 sm:text-sm">رواية فانتازيا عربية · الجزء الأول</p>
          <h1 className="mt-3 font-[family-name:var(--font-amiri)] text-4xl text-sand-900 leading-tight sm:text-5xl md:text-6xl">
            العائدة
          </h1>

          <div className="mt-5 flex items-center gap-3 text-sand-800">
            <span className="h-6 w-px bg-sand-500" />
            <p className="text-base">
              بقلم <span className="font-semibold text-sand-900">عرسان سلفيتي</span>
            </p>
          </div>

          <div className="mt-7 space-y-4 text-base leading-[2] text-sand-900 font-[family-name:var(--font-amiri)] sm:text-lg">
            {DESCRIPTION_LINES.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: "easeOut" }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="card-sand mt-9 p-5 sm:p-6 md:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-xs tracking-[0.25em] text-sand-700">السعر</p>
                <p className="num-display mt-1 font-[family-name:var(--font-amiri)] text-4xl text-sand-900">
                  50 <span className="text-xl text-sand-700">شيكل</span>
                </p>
                <p className="mt-1 text-xs text-sand-700">
                  للنسخة الواحدة · الدفع نقداً عند الاستلام
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm text-sand-800">عدد النسخ</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={dec}
                    disabled={qty <= 1}
                    aria-label="إنقاص"
                    className="stepper-btn"
                  >
                    −
                  </button>
                  <span className="num-display w-10 text-center font-[family-name:var(--font-amiri)] text-2xl text-sand-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={inc}
                    disabled={qty >= 99}
                    aria-label="زيادة"
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="gold-rule my-6" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sand-900">
                الإجمالي:{" "}
                <span className="num-display font-[family-name:var(--font-amiri)] text-2xl text-sand-900">
                  {qty * 50}
                </span>{" "}
                <span className="text-sand-700">شيكل</span>
              </p>
              <button type="button" onClick={goCheckout} className="btn-gold w-full sm:w-auto">
                احجز نسختك الآن
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </motion.div>

          <p className="mt-4 text-sm text-sand-700">
            الاستلام مباشرةً من المؤلف · الدفع نقداً.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
