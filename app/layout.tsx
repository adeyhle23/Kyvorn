import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { isShopifyConfigured } from "@/lib/shopify/config";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyvorn.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kyvorn — Built Through Adversity",
    template: "%s — Kyvorn",
  },
  description:
    "Apparel for people who got back up. Kyvorn is built on a T-12 spinal fracture, a week of paralysis, and the walk back to a finish line — sprint triathlon to marathon to ultramarathon.",
  openGraph: {
    title: "Kyvorn — Built Through Adversity",
    description:
      "Apparel for people who got back up. T-shirts, hoodies, and hats built on a real comeback.",
    url: siteUrl,
    siteName: "Kyvorn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyvorn — Built Through Adversity",
    description:
      "Apparel for people who got back up. T-shirts, hoodies, and hats built on a real comeback.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-body text-bone antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <CartProvider isShopifyConfigured={isShopifyConfigured}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-rust focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wide focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
