import Review from "../models/Review.js";
import { hashString, mulberry32, shuffle } from "../utils.js";

// Service layer: business logic — scoring + persistence.
// Deterministic mock for now; the AI comparison arrives later (DECISION.md).

export const TRACKED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "Git", "Docker", "AWS", "CI/CD",
  "Testing", "REST APIs", "MongoDB", "GraphQL", "Linux",
];

export function scoreResume(fileName, fileSize, jdText) {
  // Same file + JD length → same score, so re-uploads feel stable.
  const seed = hashString(`${fileName}:${fileSize}:${jdText.length}`);
  const rand = mulberry32(seed);

  // Score between 38 and 94
  const score = 38 + Math.floor(rand() * 57);

  // Better score → more skills "found"
  const pool = shuffle([...TRACKED_SKILLS], rand);
  const presentCount = Math.round(pool.length * (score / 100) * 0.8);

  return {
    score,
    presentSkills: pool.slice(0, presentCount),
    missingSkills: pool.slice(presentCount),
  };
}

export async function createReview({ fileName, fileSize, filePath, jdText }) {
  const result = scoreResume(fileName, fileSize, jdText);

  let saved = false;
  try {
    await Review.create({ fileName, fileSize, filePath, jdText, ...result });
    saved = true;
  } catch {
    // MongoDB down — still return the report so the UI keeps working.
  }

  return { fileName, saved, ...result };
}

export async function listReviews() {
  try {
    return await Review.find().sort({ createdAt: -1 }).limit(20).lean();
  } catch {
    return []; // Mongo down
  }
}
