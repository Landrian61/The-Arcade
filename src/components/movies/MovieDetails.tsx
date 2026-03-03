"use client";
import { useGetMovieDetails, useGetRecommendedMovies } from "@/hooks/useMovies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieDetailsProps {
  id: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
  const {
    data: movie,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useGetMovieDetails(id);
  const {
    data: recommendations,
    isPending: isRecsPending,
  } = useGetRecommendedMovies(id);

  if (isMoviePending) {
    return <div className="text-white text-2xl">Loading movie details...</div>;
  }

  if (isMovieError || !movie) {
    return <div className="text-white text-2xl">Error loading movie details.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl px-10 pb-20">
      {/* Left side: Main Movie Details */}
      <div className="flex-1 flex flex-col md:flex-row gap-8 bg-[#3a1e0d]/40 p-8 rounded-3xl border border-[#8c5a2b]/30 backdrop-blur-sm">
        <div className="w-full md:w-[350px] flex-shrink-0 relative">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              width={350}
              height={525}
              className="rounded-2xl shadow-2xl border border-[#c9a15a]/20"
            />
          ) : (
             <div className="w-[350px] h-[525px] bg-[#2a1509] rounded-2xl flex items-center justify-center border border-[#c9a15a]/20">
                <span className="text-[#c9a15a]">No Poster</span>
             </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#f5e6c8] tracking-wider uppercase mb-2">
              {movie.title}
            </h1>
            <p className="text-[#c9a15a] italic text-lg">{movie.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-1 rounded-full bg-[#6b3a18] text-[#f5e6c8] text-xs font-bold tracking-widest border border-[#8c5a2b]"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#f5e6c8] uppercase tracking-widest border-b border-[#8c5a2b]/30 pb-2">
              Overview
            </h2>
            <p className="text-[#d9c29a] leading-relaxed text-lg">
              {movie.overview}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-[#8c5a2b] uppercase text-xs font-bold tracking-widest mb-1">
                Release Date
              </p>
              <p className="text-[#f5e6c8] font-bold">{movie.release_date}</p>
            </div>
            <div>
              <p className="text-[#8c5a2b] uppercase text-xs font-bold tracking-widest mb-1">
                Runtime
              </p>
              <p className="text-[#f5e6c8] font-bold">{movie.runtime} min</p>
            </div>
            <div>
              <p className="text-[#8c5a2b] uppercase text-xs font-bold tracking-widest mb-1">
                Rating
              </p>
              <p className="text-[#f5e6c8] font-bold">
                {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>
            <div>
              <p className="text-[#8c5a2b] uppercase text-xs font-bold tracking-widest mb-1">
                Status
              </p>
              <p className="text-[#f5e6c8] font-bold">{movie.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Recommendations */}
      <div className="w-full lg:w-[350px] flex flex-col gap-6">
        <h2 className="text-2xl font-black text-[#f5e6c8] tracking-widest uppercase border-b-2 border-[#8c5a2b] pb-2">
          Recommended
        </h2>
        
        <div className="flex flex-col gap-4 max-h-[1000px] overflow-y-auto no-scrollbar">
          {isRecsPending ? (
            <div className="text-[#d9c29a]">Loading recommendations...</div>
          ) : (
            recommendations?.slice(0, 10).map((rec) => (
              <Link
                key={rec.id}
                href={`/playground/chrisppa/movies/${rec.id}`}
                className="flex gap-4 group bg-[#3a1e0d]/20 hover:bg-[#3a1e0d]/40 p-3 rounded-xl transition-all border border-transparent hover:border-[#8c5a2b]/30"
              >
                <div className="w-20 h-28 flex-shrink-0 relative overflow-hidden rounded-lg">
                  {rec.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200/${rec.poster_path}`}
                      alt={rec.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2a1509] flex items-center justify-center">
                      <span className="text-[10px] text-[#c9a15a] text-center px-1">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[#f5e6c8] font-bold text-sm group-hover:text-[#c9a15a] transition-colors line-clamp-2 uppercase tracking-wide">
                    {rec.title}
                  </h3>
                  <p className="text-[#8c5a2b] text-xs font-bold mt-1">
                    {rec.release_date?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
