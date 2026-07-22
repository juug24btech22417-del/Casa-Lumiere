import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { UnitProvider } from "@/lib/UnitContext";
import { LocaleProvider } from "@/lib/LocaleContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RuralLand — Premium Estate Development",
  description:
    "A growing collection of hand-built estates in South India. Each one is its own project — planned, plotted, and built end-to-end.",
  keywords: ["rural land", "real estate", "premium plots", "land investment", "estate development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased bg-deep-forest selection:bg-gold/15 relative overflow-x-hidden">
        {/* Tactile paper brochure noise overlay */}
        <div className="paper-grain" />

        <LocaleProvider>
          <UnitProvider>
            {children}
          </UnitProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
