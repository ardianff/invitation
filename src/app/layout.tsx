// src/app/layout.tsx

import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JakartaFont } from "@/style/fonts";
import { ToastProvider } from "@/components/toast/ToastProvider";
import InspectorWarning from "@/components/InspectorWarning";
import ScreenshotWarning from "@/components/ScreenshotWarning";
import Script from "next/script"; // Import Script from next/script
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Ardian & Anya - Wedding Invitation",
  description:
    "Wedding Invitation Ardian & Anya Sabtu, 03 Oktober 2026",
  openGraph: {
    type: "website",
    title: "Ardian & Anya - Wedding Invitation",
    locale: "id_ID",
    description:
      "Wedding Invitation Ardian & Anya Sabtu, 03 Oktober 2026",
    images: [
      {
        url: "", // Must be an absolute URL
        width: 720,
        height: 720,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={JakartaFont.className + " text-black font-normal relative"}
      >
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-3F9MPE4K7V`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3F9MPE4K7V');
          `}
        </Script>
        <ToastProvider>
          <InspectorWarning />
          <ScreenshotWarning />
          {children}
        </ToastProvider>
        <Analytics />
        <div id="portal"></div>
      </body>
    </html>
  );
}
