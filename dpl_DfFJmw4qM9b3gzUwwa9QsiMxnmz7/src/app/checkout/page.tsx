import { Suspense } from "react";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen bg-paper">
      <header className="section relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <Link
          href="/book"
          className="font-[family-name:var(--font-amiri)] text-2xl tracking-wide text-sand-900"
        >
          العائدة
        </Link>
        <Link href="/book" className="text-sm text-sand-800 hover:text-sand-900 transition-colors">
          ← العودة إلى الرواية
        </Link>
      </header>

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-6 py-20 text-center text-sand-800">
            جاري التحميل…
          </div>
        }
      >
        <CheckoutForm />
      </Suspense>

      <Footer />
    </div>
  );
}
