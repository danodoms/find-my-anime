//interface for API endpoint

export interface Anime {
  data: {
    mal_id: number; // Assuming mal_id should be a number
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    trailer?: Trailer; // Optional trailer property
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: AnimeType; // Use a custom type for valid anime types
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
    season: Season; // Use a custom type for valid seasons
    year: number;
    broadcast?: Broadcast; // Optional broadcast property
    producers: Producer[];
    licensors: Licensor[];
    studios: Studio[];
    genres: Genre[];
    explicit_genres: Genre[];
    themes: Theme[];
    demographics: Demographic[];
    relations: Relation[];
    theme: {
      openings: string[];
      endings: string[];
    };
    external: External[];
    streaming: Streaming[];
  };
}

// Custom types for improved clarity and type safety
type AnimeType = "TV" | "Movie" | "OVA" | "ONA" | "Special" | "Music"; // Add other possible types
type Season = "winter" | "spring" | "summer" | "fall";

interface Trailer {
  youtube_id?: string; // Optional youtube_id
  url: string;
  embed_url: string;
}

interface Aired {
  from: string;
  to: string;
  prop: {
    from: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
    string: string;
  };
}

interface Broadcast {
  day?: string; // Optional day
  time?: string; // Optional time
  timezone?: string; // Optional timezone
  string: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Licensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Relation {
  relation: string;
  entry: Entry[];
}

interface Entry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Theme {
  openings: string[];
  endings: string[];
}

interface External {
  name: string;
  url: string;
}

interface Streaming {
  name: string;
  url: string;
}

interface Title {
  type: string;
  title: string;
}
