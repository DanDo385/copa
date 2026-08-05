import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteMain } from "@/components/SiteMain";
import { Providers } from "@/app/providers";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CopaJewelry",
    template: "%s | CopaJewelry",
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
    <html lang="en" className={jost.variable}>
      <body>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteChrome />
          <SiteMain>{children}</SiteMain>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
