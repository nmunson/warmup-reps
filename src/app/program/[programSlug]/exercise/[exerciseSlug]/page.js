import Link from "next/link";
import { notFound } from "next/navigation";

import { ExerciseCalculator } from "@/components/exercise-calculator";
import { Footer, PageChrome } from "@/components/page-chrome";
import { getExercise, getPrograms } from "@/lib/programs";

export async function generateStaticParams() {
  const programs = await getPrograms();

  return programs.flatMap((program) =>
    program.exercises.map((exercise) => ({
      programSlug: program.slug,
      exerciseSlug: exercise.slug
    }))
  );
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
