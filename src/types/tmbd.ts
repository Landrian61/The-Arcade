// Base interface for a movie item in list responses (shared across categories)
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Generic paginated response (used for all list categories like popular, favorites, etc.)
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Example usage for specific categories (these are type aliases, not new interfaces)
export type PopularMoviesResponse = PaginatedResponse<Movie>;
export type TopRatedMoviesResponse = PaginatedResponse<Movie>;
export type UpcomingMoviesResponse = PaginatedResponse<Movie>;
export type NowPlayingMoviesResponse = PaginatedResponse<Movie>;
export type FavoriteMoviesResponse = PaginatedResponse<Movie>; // As per the linked endpoint

// Interface for single movie details (extends Movie for shared fields)
export interface MovieDetails extends Movie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

// Optional: If you append extra data to details (e.g., ?append_to_response=credits), define add-ons
export interface MovieCredits {
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[];
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }[];
}

// If appending credits, extend MovieDetails in fetch logic
export type MovieDetailsWithCredits = MovieDetails & { credits: MovieCredits };
