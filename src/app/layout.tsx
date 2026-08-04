import type { Metadata } from "next";
import "@/styles/globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: "COPA Jewelry",
    template: "%s | COPA Jewelry",
  },
  description:
    "Brazilian-founded jewelry curation with live styling from the people who source it. Prototype storefront.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteChrome />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
