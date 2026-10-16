"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-cinematic text-white flex items-center justify-center px-5 py-10 sm:px-6">
      {/* ambient blurred cover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.09] blur-2xl">
        <Image
          src="/book-cover.jpg"
          alt=""
          width={900}
          height={1200}
          priority
          className="object-contain"
        />
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-[family-name:var(--font-amiri)] text-white text-2xl sm:text-3xl md:text-5xl leading-[1.7] tracking-wide"
        >
          بعض الأبواب لا تُفتح إلا مرّةً واحدة.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
          className="mt-6 font-[family-name:var(--font-amiri)] shimmer-text text-2xl sm:text-3xl md:text-5xl leading-[1.7] tracking-wide"
        >
          وهذا البابُ مفتوحٌ لكَ الآن.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 3.2 }}
          className="mx-auto mt-14 h-px w-40 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 3.6 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/book" className="btn-gold group">
            <span>ادخل الآن</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.4, delay: 4.4 }}
          className="mt-8 text-xs tracking-[0.3em] text-amber-100/70 font-[family-name:var(--font-cairo)]"
        >
          العائدة · رواية فانتازيا عربية
        </motion.p>
      </div>
    </main>
  );
}
