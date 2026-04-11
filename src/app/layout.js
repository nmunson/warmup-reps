import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildCanonical,
  buildOpenGraph,
  buildTwitter
} from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description: DEFAULT_DESCRIPTION,
  alternates: buildCanonical("/"),
  openGraph: buildOpenGraph({
    title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    pathname: "/"
  }),
  twitter: buildTwitter({
    title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/images/apple-touch-icon-57x57.png" },
      { url: "/images/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/images/apple-touch-icon-114x114.png", sizes: "114x114" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          rel="stylesheet"
          href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"
        />
      </head>
      <body>
        <main className="site-shell">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
