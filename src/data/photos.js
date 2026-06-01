// Gallery photos.
//
// To add or remove photos, just change PHOTO_COUNT below and drop matching
// files into /public/images named photo-1.jpg, photo-2.jpg, ... photo-N.jpg.
// Captions and the masonry "tall" layout adapt automatically to any count.

export const PHOTO_COUNT = 21;

const captions = [
  "Sunshine smile",
  "Golden hour",
  "Pure joy",
  "Little adventures",
  "Sweet moments",
  "Always laughing",
  "Best days",
  "Forever memories",
  "Cozy evenings",
  "Wild & free",
  "Soft mornings",
  "Celebrate you",
  "Star of the show",
  "Good times",
  "To many more",
  "Unforgettable",
  "Just you",
  "Happy heart",
  "Bright eyes",
  "Magic moments",
  "Endless smiles",
];

// Prefix with Vite's BASE_URL so paths resolve correctly on GitHub Pages
// (e.g. /happy-birthday/images/photo-1.jpg) and locally.
const BASE = import.meta.env.BASE_URL;

export const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    src: `${BASE}images/photo-${n}.jpg`,
    // Caption list cycles so any PHOTO_COUNT works without code changes.
    caption: captions[i % captions.length],
    alt: `Memory ${n} — ${captions[i % captions.length]}`,
    // Every 3rd-ish photo is taller for an organic masonry rhythm.
    tall: n % 3 === 1,
  };
});

export default photos;
