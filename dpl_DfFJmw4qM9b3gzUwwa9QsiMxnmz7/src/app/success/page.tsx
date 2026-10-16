import { Suspense } from "react";
import { SuccessView } from "@/components/SuccessView";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen bg-paper">
      <header className="section relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/book"
          className="font-[family-name:var(--font-amiri)] text-2xl tracking-wide text-sand-900"
        >
          العائدة
        </Link>
      </header>

      <Suspense fallback={null}>
        <SuccessView />
      </Suspense>

      <Footer />
    </div>
  );
}
