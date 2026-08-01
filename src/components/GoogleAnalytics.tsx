"use client"; // This ensures the component runs on the client-side

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  trackingId: string;
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", trackingId, {
        page_path: window.location.pathname,
      });
    }
  }, [trackingId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

