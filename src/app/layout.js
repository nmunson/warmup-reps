import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "WarmupReps.com",
  description: "Warmup set and plate loading calculator for common strength programs",
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
