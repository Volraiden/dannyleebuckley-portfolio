export type GalleryCategory =
  | 'motorsport'
  | 'events'
  | 'portraits'
  | 'automotive'
  | 'cinematic';

export const GALLERY_COUNT = 134;

export const GALLERY_FILTERS: { id: GalleryCategory | 'all'; labelKey: string }[] = [
  { id: 'all', labelKey: 'galleryFilterAll' },
  { id: 'motorsport', labelKey: 'galleryFilterMotorsport' },
  { id: 'events', labelKey: 'galleryFilterEvents' },
  { id: 'portraits', labelKey: 'galleryFilterPortraits' },
  { id: 'automotive', labelKey: 'galleryFilterAutomotive' },
  { id: 'cinematic', labelKey: 'galleryFilterCinematic' },
];

const PORTRAITS = new Set([8, 25, 30, 35, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
const EVENTS = new Set([60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 90]);
const PARTNER_MARKS = new Set([110, 130]);
const AUTOMOTIVE = new Set([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

function categoriesFor(n: number): GalleryCategory[] {
  if (PARTNER_MARKS.has(n)) return ['events'];

  const cats: GalleryCategory[] = [];
  if (PORTRAITS.has(n)) cats.push('portraits');
  if (EVENTS.has(n)) cats.push('events');
  if (AUTOMOTIVE.has(n)) cats.push('automotive');

  const raceWeekend =
    (n >= 1 && n <= 49 && !PORTRAITS.has(n)) ||
    (n >= 80 && n <= 109);
  if (raceWeekend || n === 90) cats.push('motorsport');

  if (n === 50 || n === 70 || cats.length === 0) cats.push('cinematic');

  return cats;
}

export const GALLERY = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    src: `/images/gallery/${String(n).padStart(2, '0')}.png`,
    alt: `Daniel Lee Buckley — still ${String(n).padStart(2, '0')}`,
    index: i,
    categories: categoriesFor(n),
  };
});

export function padFrame(n: number) {
  return String(n).padStart(2, '0');
}
