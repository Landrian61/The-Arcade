"use client";
import MovieCard from "@/components/movie-card/MovieCard";
import MovieSkeleton from "@/components/movies/MovieSkeleton";
import { useGetMovies } from "@/hooks/useMovies";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "POPULAR MOVIES";
  const pageParam = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const page = parseInt(pageParam, 10);

  const { data: movies, isPending, isError } = useGetMovies(category, page, query);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    // Preserve category
    if (category) params.set("category", category);
    if (query) params.set("query", query);
    
    router.push(`?${params.toString()}`);
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-5 gap-y-10 gap-x-6 mt-32 mb-40 w-full px-10">
        {[...Array(10)].map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white text-2xl mt-32">Error fetching movies</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-y-10 gap-x-6 mt-32 mb-40 w-full px-10">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title.slice(0, 20) + "..."}
            description={movie.overview.slice(0, 100) + "..."}
            imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            href={`/playground/chrisppa/movies/${movie.id}`}
          />
        ))}
      </div>
      <div className="flex gap-4 mb-32">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="nav-pill nav-pill-active disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2"
        >
          Previous
        </button>
        <span className="text-white self-center text-xl font-bold border-none">{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="nav-pill px-6 py-2 border-none"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Page;
