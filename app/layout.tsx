import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Nostalgia Radio | Cassette Shop & Golden Hour Memories",
  description: "A single-page nostalgia radio station inspired by vintage Indian cassette shops, old transistors, and golden hour street life.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-dvh bg-black text-white selection:bg-amber-500/30 selection:text-amber-200">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

