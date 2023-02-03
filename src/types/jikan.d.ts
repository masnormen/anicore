

export interface JikanResponse<T> {
  pagination: JikanPagination;
  data: T[];
  links: Links;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year?: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Theme[];
  demographics: Demographic[];
}

export interface AnimeField {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export type Producer = AnimeField;
export type Licensor = AnimeField;
export type Studio = AnimeField;
export type Genre = AnimeField;
export type Theme = AnimeField;
export type Demographic = AnimeField;

export type Images = Record<
  'jpg' | 'webp',
  {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  }
>;

export interface TrailerImage {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: TrailerImage;
}

export interface Title {
  type: string;
  title: string;
}

export interface AiringDate {
  day: number;
  month: number;
  year: number;
}

export interface AiringDate {
  from: AiringDate;
  to?: AiringDate;
}

export interface Aired {
  from: Date;
  to?: Date;
  prop: AiringDate;
  string: string;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}
