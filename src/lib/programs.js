import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { slugify } from "@/lib/warmup";

const PROGRAM_FILES = [
  "starting_strength.json",
  "program_2.json",
  "max_single.json",
  "greyskull_lp.json"
];

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const programsDirectory = path.resolve(currentDirectory, "../../programs");

export async function getPrograms() {
  const programs = await Promise.all(
    PROGRAM_FILES.map(async (fileName) => {
      const filePath = path.join(programsDirectory, fileName);
      const content = await fs.readFile(filePath, "utf8");
      const program = JSON.parse(content);

      return {
        ...program,
        slug: slugify(program.title),
        exercises: program.exercises.map((exercise) => ({
          ...exercise,
          slug: slugify(exercise.name)
        }))
      };
    })
  );

  return programs;
}

export async function getProgramBySlug(programSlug) {
  const programs = await getPrograms();
  return programs.find((program) => program.slug === programSlug) || null;
}

export async function getExercise(programSlug, exerciseSlug) {
  const program = await getProgramBySlug(programSlug);

  if (!program) {
    return null;
  }

  const exercise =
    program.exercises.find((item) => item.slug === exerciseSlug) || null;

  return exercise ? { program, exercise } : null;
}
