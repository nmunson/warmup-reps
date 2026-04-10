import Link from "next/link";

import { Footer, PageChrome } from "@/components/page-chrome";
import { buildNoIndexMetadata } from "@/lib/seo";

export function generateMetadata() {
  return buildNoIndexMetadata({
    title: "Page Not Found",
    description: "The requested WarmupReps page could not be found.",
    pathname: "/not-found"
  });
}

export default function NotFound() {
  return (
    <PageChrome footer={<Footer />} homeHref="/">
      <h2>Page not found</h2>
      <p>The requested program or exercise does not exist.</p>
      <Link className="button-link ui-btn ui-corner-all" href="/">
        Return home
      </Link>
    </PageChrome>
  );
}
