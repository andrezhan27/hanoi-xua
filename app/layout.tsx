import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hà Nội Xưa | Vietnamese Restaurant in Lisbon",
  description:
    "Discover authentic Vietnamese flavours inspired by Hanoi in the heart of Lisbon.",
  icons: {
    icon: "/images/hanoi-logo-icon.png",
    shortcut: "/images/hanoi-logo-icon.png",
    apple: "/images/hanoi-logo-icon.png",
  },
  openGraph: {
    title: "Hà Nội Xưa | Vietnamese Restaurant in Lisbon",
    description:
      "Warm Hanoi nostalgia, traditional recipes and Vietnamese hospitality in Lisbon.",
    type: "website",
    locale: "pt_PT",
    alternateLocale: "en_GB",
    siteName: "Hà Nội Xưa",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hà Nội Xưa — Vietnamese flavours in Lisbon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hà Nội Xưa | Vietnamese Restaurant in Lisbon",
    description: "Vietnamese flavours inspired by Hanoi, served with warmth in Lisbon.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
