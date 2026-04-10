import Link from "next/link";
import { notFound } from "next/navigation";

import { ExerciseCalculator } from "@/components/exercise-calculator";
import { Footer, PageChrome } from "@/components/page-chrome";
import { getExercise, getPrograms } from "@/lib/programs";
import { buildIndexableMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const programs = await getPrograms();

  return programs.flatMap((program) =>
    program.exercises.map((exercise) => ({
      programSlug: program.slug,
      exerciseSlug: exercise.slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const { programSlug, exerciseSlug } = await params;
  const result = await getExercise(programSlug, exerciseSlug);

  if (!result) {
    return {};
  }

  const { program, exercise } = result;

  return buildIndexableMetadata({
    title: `${exercise.name} Warmup Calculator for ${program.title}`,
    description: `Calculate ${exercise.name} warmup sets and barbell plate loading for ${program.title} using your target working weight.`,
    pathname: `/program/${program.slug}/exercise/${exercise.slug}`
  });
}

export default async function ExercisePage({ params }) {
  const { programSlug, exerciseSlug } = await params;
  const result = await getExercise(programSlug, exerciseSlug);

  if (!result) {
    notFound();
  }

  const { program, exercise } = result;

  return (
    <PageChrome homeHref="/" footer={<Footer />}>
        <ExerciseCalculator exercise={exercise} />
        <p>
          <Link className="button-link ui-btn ui-corner-all" href={`/program/${program.slug}`}>
            Choose another exercise
          </Link>
        </p>
    </PageChrome>
  );
}
