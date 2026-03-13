import Link from "next/link";

import { Footer, PageChrome } from "@/components/page-chrome";
import { ProgramIcon } from "@/components/program-icon";
import { SettingsIcon } from "@/components/settings-icon";
import { getPrograms } from "@/lib/programs";

export default async function HomePage() {
  const programs = await getPrograms();

  return (
    <PageChrome footer={<Footer />} homeHref="/">
      <h2>Getting Started</h2>
      <p>
        Choose a program, exercise, and then set your target weight. Your
        warmup sets will then be automatically calculated.
      </p>
      <h3>Choose a program:</h3>
      <div className="program-list">
        {programs.map((program) => (
          <Link
            key={program.slug}
            className="button-link ui-btn ui-corner-all"
            href={`/program/${program.slug}`}
          >
            <span className="lift-label">
              <ProgramIcon name={program.title} />
              <span>{program.title}</span>
            </span>
          </Link>
        ))}
        <Link className="button-link ui-btn ui-corner-all" href="/settings">
          <span className="lift-label">
            <SettingsIcon className="lift-icon" />
            <span>Settings</span>
          </span>
        </Link>
      </div>
    </PageChrome>
  );
}
