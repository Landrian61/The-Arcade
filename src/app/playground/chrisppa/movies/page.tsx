"use client";
import MovieCard from "@/components/movie-card/MovieCard";
import { useGetMovies } from "@/hooks/useMovies";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [active, setActive] = useState(0);
  const [navPill, setNavPill] = useState("POPULAR MOVIES");
  const [page, setPage] = useState(1);
  const { data: movies, isPending, isError } = useGetMovies(navPill, page);

  const handleNavPill = (item: string, i: number) => {
    setNavPill(item);
    setActive(i);
    setPage(1);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movies</div>;
  }

  return (
    <div
      className="relative h-[1400px] flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/cris/bg.png')"
      }}
    >
      <Image
        src="/images/cris/movie_logo2.png"
        width={350}
        height={300}
        alt="movie logo"
        className="absolute -top-20"
      />

      <ul className="list-none w-full px-32 pt-8 flex justify-between">
        <div className="flex gap-8">
          {["POPULAR MOVIES", "TRENDING", "UPCOMING"].map((item, i) => (
            <li
              key={item}
              onClick={() => handleNavPill(item, i)}
              className={`nav-pill ${active === i ? "nav-pill-active" : ""}`}
            >
              {item}
            </li>
          ))}
        </div>

        <div className="flex gap-8">
          {["NOW PLAYING", "TOP RATED", "FAVORITES"].map((item, i) => (
            <li
              key={item}
              onClick={() => handleNavPill(item, i + 3)}
              className={`nav-pill ${
                active === i + 3 ? "nav-pill-active" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </div>
      </ul>
      <div className="grid grid-cols-5 gap-y-10 gap-x-6 mt-32 mb-40">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title.slice(0, 20) + "..."}
            description={movie.overview.slice(0, 100) + "..."}
            imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            href={`/movie/${movie.id}`}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="nav-pill nav-pill-active disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="nav-pill"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
