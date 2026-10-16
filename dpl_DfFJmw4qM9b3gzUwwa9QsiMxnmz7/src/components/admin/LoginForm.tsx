"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/admin";

  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const code = digits.join("");

  const handleChange = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    setError(null);
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (text.length === 4) {
      e.preventDefault();
      setDigits(text.split(""));
      setTimeout(() => refs.current[3]?.focus(), 0);
    }
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (code.length !== 4) {
      setError("أدخل الرمز المكوّن من 4 أرقام.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        setError("رمز غير صحيح.");
        setDigits(["", "", "", ""]);
        refs.current[0]?.focus();
        setSubmitting(false);
        return;
      }
      router.replace(next);
    } catch {
      setError("تعذّر الاتصال. حاول مرة أخرى.");
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full rounded-3xl border border-amber-200/20 bg-black/40 p-8 backdrop-blur-xl"
      dir="ltr"
    >
      <div dir="rtl" className="text-center">
        <p className="text-xs tracking-[0.35em] text-amber-200/80">لوحة التحكم</p>
        <h1 className="mt-2 font-[family-name:var(--font-amiri)] text-3xl text-white">
          أدخل الرمز السري
        </h1>
        <p className="mt-2 text-sm text-amber-100/70">يُسمح بالدخول للمؤلف فقط.</p>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            autoFocus={i === 0}
            type="password"
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoComplete="one-time-code"
            maxLength={1}
            className="h-16 w-14 rounded-xl border border-amber-200/30 bg-white/5 text-center text-3xl font-semibold text-white caret-amber-200 outline-none transition focus:border-amber-200 focus:bg-white/10 focus:ring-4 focus:ring-amber-200/20"
          />
        ))}
      </div>

      {error ? (
        <p dir="rtl" className="mt-5 rounded-lg bg-red-500/15 px-4 py-3 text-center text-sm text-red-200 ring-1 ring-red-400/30">
          {error}
        </p>
      ) : null}

      <div dir="rtl" className="mt-7">
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold w-full disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "جارٍ التحقّق…" : "دخول"}
        </button>
      </div>

      <div dir="rtl" className="mt-5 text-center text-xs text-amber-100/50">
        <a href="/" className="transition hover:text-amber-100">
          ← العودة إلى الموقع
        </a>
      </div>
    </motion.form>
  );
}
