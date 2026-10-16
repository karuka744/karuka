"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export function SuccessView() {
  const sp = useSearchParams();
  const name = sp.get("name") ?? "";
  const qty = Number(sp.get("qty")) || 1;

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.1 }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sand-200 to-sand-400 ring-4 ring-white/60 shadow-[0_20px_40px_-10px_rgba(90,67,34,0.45)]"
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-sand-900" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12l5 5L20 6" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 font-[family-name:var(--font-amiri)] text-4xl md:text-5xl text-sand-900"
      >
        وصلَ طلبُك إلى المؤلف
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-4 text-lg leading-9 text-sand-700"
      >
        {name ? <>شكراً لك يا <span className="font-semibold text-sand-900">{name}</span>. </> : null}
        تمَّ تسجيلُ طلبك لـ{" "}
        <span className="num-display font-[family-name:var(--font-amiri)] text-2xl text-sand-900">{qty}</span>{" "}
        نسخة من رواية "العائدة".
        <br />
        سيتواصلُ معك المؤلف قريباً عبر الواتساب لتنسيقِ الاستلام والدفع.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/book" className="btn-gold">
          العودة إلى الرواية
        </Link>
        <a
          href="https://wa.me/972533234368"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white/70 px-6 py-3 text-sand-800 shadow-sm transition hover:bg-white"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-emerald-600" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.8 1.48h.01c6.63 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.21-3.47-8.4z"/></svg>
          محادثة المؤلف
        </a>
      </motion.div>
    </section>
  );
}
