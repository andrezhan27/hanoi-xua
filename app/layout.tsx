import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const heading = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-500.ttf", weight: "500" },
    { path: "./fonts/cormorant-garamond-600.ttf", weight: "600" },
    { path: "./fonts/cormorant-garamond-700.ttf", weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/manrope-400.ttf", weight: "400" },
    { path: "./fonts/manrope-500.ttf", weight: "500" },
    { path: "./fonts/manrope-600.ttf", weight: "600" },
    { path: "./fonts/manrope-700.ttf", weight: "700" },
  ],
  variable: "--font-body",
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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hà Nội Xưa — Vietnamese flavours in Lisbon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hà Nội Xưa | Vietnamese Restaurant in Lisbon",
    description: "Vietnamese flavours inspired by Hanoi, served with warmth in Lisbon.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
