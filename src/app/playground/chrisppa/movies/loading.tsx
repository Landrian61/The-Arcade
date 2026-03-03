import MovieSkeleton from "@/components/movies/MovieSkeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="grid grid-cols-5 gap-y-10 gap-x-6 mt-32 mb-40 w-full px-10">
      {[...Array(10)].map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  );
}
