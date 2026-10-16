import { BookDisplay } from "@/components/BookDisplay";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="relative bg-paper min-h-screen">
      <header className="section relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-amiri)] text-2xl tracking-wide text-sand-900"
        >
          العائدة
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-sand-800 md:flex">
          <a href="#about" className="hover:text-sand-900 transition-colors">
            عن الرواية
          </a>
          <a href="#author" className="hover:text-sand-900 transition-colors">
            المؤلف
          </a>
          <a href="#faq" className="hover:text-sand-900 transition-colors">
            الطلب والاستلام
          </a>
          <a href="#contact" className="hover:text-sand-900 transition-colors">
            تواصل
          </a>
        </nav>
      </header>

      <BookDisplay />

      {/* Pull quote */}
      <section id="about" className="section mx-auto mt-20 max-w-4xl px-4 text-center sm:px-6 md:mt-24">
        <div className="gold-rule mx-auto w-32 opacity-80" />
        <p className="mt-8 font-[family-name:var(--font-amiri)] text-xl leading-[2] text-sand-900 sm:text-2xl md:text-3xl">
          «في رُمازَ، لا يُولَد أحدٌ بلا جوهرة، ولا تختفي جوهرةٌ بلا سبب.»
        </p>
        <div className="gold-rule mx-auto mt-8 w-32 opacity-80" />
      </section>

      {/* About the author */}
      <section id="author" className="section mx-auto mt-20 max-w-5xl px-4 sm:px-6 md:mt-24">
        <div className="card-sand grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-5 md:p-12">
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.3em] text-sand-700">المؤلف</p>
            <h2 className="mt-2 font-[family-name:var(--font-amiri)] text-3xl text-sand-900 sm:text-4xl">
              عرسان سلفيتي
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sand-800">
              <span className="h-px w-10 bg-sand-500" />
              <span className="text-sm">كاتبُ الرواية</span>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-base leading-[2] text-sand-900 font-[family-name:var(--font-amiri)] sm:text-lg">
              عرسانُ سلفيتي كاتبٌ عربيٌّ يَنسِجُ من حروفه عوالِمَ تَنبضُ بالأسطورة
              والقَدر. «العائدة» هي الجزءُ الأوّلُ من رحلتِه في عالَمِ رُماز:
              مملكةٌ تُولَدُ فيها الأقدارُ على جباهِ أهلها، وتُدَوَّنُ أسرارُها في
              جواهرَ لا تَكذِب.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ / Pre-order details */}
      <section id="faq" className="section mx-auto mt-20 max-w-5xl px-4 sm:px-6 md:mt-24">
        <h2 className="text-center font-[family-name:var(--font-amiri)] text-3xl text-sand-900 sm:text-4xl">
          الطلبُ والاستلام
        </h2>
        <p className="mt-3 text-center text-sand-800">كلّ ما تحتاج معرفته قبل الحجز</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:mt-10">
          {[
            {
              t: "سعر النسخة",
              d: "50 شيكلًا لكلّ نسخة. يُمكنكَ طلبُ أكثرَ من نسخة في طلبٍ واحد.",
              icon: (
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              ),
            },
            {
              t: "طريقة الدفع",
              d: "الدفعُ نقداً عند الاستلام فقط. لا حاجةَ لبطاقةٍ ائتمانية.",
              icon: (
                <>
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M2 10h20" />
                </>
              ),
            },
            {
              t: "الاستلام",
              d: "استلامٌ شخصيٌّ مباشرةً من المؤلف. تُنسَّقُ التفاصيلُ عبر الواتساب بعد الطلب.",
              icon: (
                <>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </>
              ),
            },
          ].map((f) => (
            <div key={f.t} className="card-sand p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-200/90 text-sand-800">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-amiri)] text-xl text-sand-900">
                {f.t}
              </h3>
              <p className="mt-2 leading-7 text-sand-900/95">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact mini-section */}
      <section id="contact" className="section mx-auto mt-20 max-w-5xl px-4 sm:px-6 md:mt-24">
        <div className="card-sand flex flex-col items-center gap-5 p-8 text-center sm:p-10 md:flex-row md:justify-between md:text-right">
          <div>
            <h2 className="font-[family-name:var(--font-amiri)] text-2xl text-sand-900 sm:text-3xl">
              جاهزٌ لعبور الباب؟
            </h2>
            <p className="mt-2 text-sand-800">احجز نسختك الآن وانضمَّ إلى رحلة عمرو في رُماز.</p>
          </div>
          <Link href="#top" className="btn-gold w-full sm:w-auto" scroll={true}>
            إلى الأعلى واحجز
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
