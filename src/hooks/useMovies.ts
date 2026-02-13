import { Movie, MovieDetails } from "@/types/tmbd";
import { useQuery } from "@tanstack/react-query";

const fetchPopularMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  return data.results;
};

const fetchTopRatedMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  return data.results;
};

const fetchUpcomingMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
};

const fetchNowPlayingMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
};

const fetchTrendingMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
};

const fetchSearchMovies = async (query: string, page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results;
};

export const useGetMovies = (navPill: string, page: number, query: string = "") => {
  switch (navPill) {
    case "POPULAR MOVIES":
      return useQuery({
        queryKey: ["popular_movies", page],
        queryFn: () => fetchPopularMovies(page),
      });
    case "TOP RATED":
      return useQuery({
        queryKey: ["top_rated_movies", page],
        queryFn: () => fetchTopRatedMovies(page),
      });
    case "UPCOMING":
      return useQuery({
        queryKey: ["upcoming_movies", page],
        queryFn: () => fetchUpcomingMovies(page),
      });
    case "NOW PLAYING":
      return useQuery({
        queryKey: ["now_playing_movies", page],
        queryFn: () => fetchNowPlayingMovies(page),
      });
    case "TRENDING":
      return useQuery({
        queryKey: ["trending_movies", page],
        queryFn: () => fetchTrendingMovies(page),
      });
    case "SEARCH":
      return useQuery({
        queryKey: ["search_movies", query, page],
        queryFn: () => fetchSearchMovies(query, page),
        enabled: !!query,
      });
    default:
      return useQuery({
        queryKey: ["popular_movies", page],
        queryFn: () => fetchPopularMovies(page),
      });
  }
};

const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

const fetchRecommendedMovies = async (id: string): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  const data = await res.json();
  return data.results;
};

export const useGetMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movie_details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });
};

export const useGetRecommendedMovies = (id: string) => {
  return useQuery({
    queryKey: ["recommended_movies", id],
    queryFn: () => fetchRecommendedMovies(id),
    enabled: !!id,
  });
};
