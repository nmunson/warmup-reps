import Link from "next/link";
import { notFound } from "next/navigation";

import { LiftIcon } from "@/components/lift-icon";
import { Footer, PageChrome } from "@/components/page-chrome";
import { ProgramIcon } from "@/components/program-icon";
import { getProgramBySlug, getPrograms } from "@/lib/programs";
import { buildIndexableMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ programSlug: program.slug }));
}

export async function generateMetadata({ params }) {
  const { programSlug } = await params;
  const program = await getProgramBySlug(programSlug);

  if (!program) {
    return {};
  }

  return buildIndexableMetadata({
    title: `${program.title} Warmup Calculator`,
    description: `Calculate warmup sets and plate loading for ${program.title}. Choose an exercise and get barbell-ready weights instantly.`,
    pathname: `/program/${program.slug}`
  });
}

export default async function ProgramPage({ params }) {
  const { programSlug } = await params;
  const program = await getProgramBySlug(programSlug);

  if (!program) {
    notFound();
  }

  return (
    <PageChrome homeHref="/" footer={<Footer />}>
        <h2 className="exercise-heading">
          <ProgramIcon name={program.title} />
          <span>{program.title}</span>
        </h2>
        <p>Choose an exercise from the program.</p>
        <div className="exercise-list">
          {program.exercises.map((exercise) => (
            <Link
              key={exercise.slug}
              className="button-link ui-btn ui-corner-all"
              href={`/program/${program.slug}/exercise/${exercise.slug}`}
            >
              <span className="lift-label">
                <LiftIcon name={exercise.name} />
                <span>{exercise.name}</span>
              </span>
            </Link>
          ))}
        </div>
        <hr />
        <p>
          <Link className="button-link ui-btn ui-corner-all" href="/">
            Choose another program
          </Link>
        </p>
    </PageChrome>
  );
}
