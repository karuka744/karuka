import type { Metadata, Viewport } from "next";
import { Amiri, Cairo } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F2E2B6",
};

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://alaaeda.vercel.app"
  ),
  title: "العائدة — رواية فانتازيا عربية",
  description:
    "العائدة — الجزء الأول من رواية فانتازيا عربية بقلم عرسان سلفيتي. اطلب نسختك الآن.",
  openGraph: {
    title: "العائدة — رواية فانتازيا عربية",
    description: "الجزء الأول — بقلم عرسان سلفيتي",
    images: ["/book-cover.jpg"],
    type: "book",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
