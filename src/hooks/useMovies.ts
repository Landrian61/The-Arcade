import { Movie } from "@/types/tmbd";
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

export const useGetMovies = (navPill: string, page: number) => {
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
    default:
      return useQuery({
        queryKey: ["popular_movies", page],
        queryFn: () => fetchPopularMovies(page),
      });
  }
};
