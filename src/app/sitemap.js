import { getPrograms } from "@/lib/programs";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap() {
  const programs = await getPrograms();
  const entries = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  for (const program of programs) {
    entries.push({
      url: absoluteUrl(`/program/${program.slug}`),
      changeFrequency: "monthly",
      priority: 0.8
    });

    for (const exercise of program.exercises) {
      entries.push({
        url: absoluteUrl(`/program/${program.slug}/exercise/${exercise.slug}`),
        changeFrequency: "monthly",
        priority: 0.7
      });
    }
  }

  return entries;
}
