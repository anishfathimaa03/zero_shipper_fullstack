// ============================================
// Frontend fallback scoring — used only when the backend is offline.
// Mirrors backend/src/score.js: same file + JD length → same report.
// The AI comparison arrives later — see DECISION.md.
// ============================================
export const TRACKED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "Git", "Docker", "AWS", "CI/CD",
  "Testing", "REST APIs", "MongoDB", "GraphQL", "Linux",
];

// The mock analysis — deterministic: same file in, same report out.
export function analyse(file, jdText = "") {
  // Seed a pseudo-random generator from the file's name and size so the
  // result is stable: same file, same score.
  const seed = hashString(`${file.name}:${file.size}:${jdText.length}`);
  const rand = mulberry32(seed);

  // Score between 38 and 94
  const score = 38 + Math.floor(rand() * 57);

  // How many skills the resume "contains" — better score, more skills
  const presentCount = Math.round(TRACKED_SKILLS.length * (score / 100) * 0.8);

  // Shuffle the pool with the seeded RNG, then split present/missing
  const pool = shuffle([...TRACKED_SKILLS], rand);
  const present = pool.slice(0, presentCount);
  const missing = pool.slice(presentCount);

  return { score, present, missing };
}

export function formatSize(bytes) {
  return bytes > 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + " MB"
    : Math.max(1, Math.round(bytes / 1024)) + " KB";
}

// ---- internals (not exported) ----

// FNV-1a string hash → 32-bit unsigned int
function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Seeded PRNG (mulberry32) — small, fast, deterministic
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher–Yates shuffle driven by the seeded RNG
function shuffle(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
