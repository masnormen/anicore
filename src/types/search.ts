export const animeType = ['tv', 'movie', 'ova', 'special', 'ona', 'music'] as const;

export type AnimeType = (typeof animeType)[number];
