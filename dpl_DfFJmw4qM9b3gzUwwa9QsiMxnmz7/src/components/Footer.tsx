import Link from "next/link";

export function Footer() {
  return (
    <footer className="section mt-24 border-t border-sand-200/60 bg-gradient-to-b from-transparent to-sand-100/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-[family-name:var(--font-amiri)] text-2xl text-sand-800">
              العائدة
            </h3>
            <p className="mt-2 text-sand-700/80 leading-7">
              رواية فانتازيا عربية — الجزء الأول.
              <br />
              بقلم عرسان سلفيتي.
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-amiri)] text-xl text-sand-800">
              تواصل معنا
            </h4>
            <ul className="mt-3 space-y-2 text-sand-700">
              <li>
                <a
                  href="mailto:orsan304@gmail.com"
                  className="hover:text-sand-900 transition-colors inline-flex items-center gap-2"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
                  orsan304@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+972533234368"
                  dir="ltr"
                  className="hover:text-sand-900 transition-colors inline-flex items-center gap-2"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.37 1.78.72 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.82.35 1.7.59 2.6.72A2 2 0 0 1 22 16.92z"/></svg>
                  +972 53-323-4368
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/972533234368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sand-900 transition-colors inline-flex items-center gap-2"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.8 1.48h.01c6.63 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.21-3.47-8.4zM12 21.8a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.68.97.98-3.59-.23-.37A9.86 9.86 0 1 1 21.84 12 9.87 9.87 0 0 1 12 21.8zm5.43-7.37c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>
                  واتساب
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-amiri)] text-xl text-sand-800">
              الطلب والاستلام
            </h4>
            <ul className="mt-3 space-y-2 text-sand-700/90 leading-7">
              <li>الدفع نقداً عند الاستلام.</li>
              <li>الاستلام مباشرةً من المؤلف.</li>
              <li>السعر: 50 شيكل للنسخة الواحدة.</li>
            </ul>
          </div>
        </div>

        <div className="gold-rule my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-sand-700/70 md:flex-row">
          <p>© 2026 العائدة · جميع الحقوق محفوظة.</p>
          <Link href="/" className="hover:text-sand-900 transition-colors">
            العودة إلى البداية
          </Link>
        </div>
      </div>
    </footer>
  );
}
