"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MovieNavbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "POPULAR MOVIES";

  const handleNavPill = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", item);
    // Reset page to 1 when changing category
    params.set("page", "1");
    router.push(`/playground/chrisppa/movies?${params.toString()}`);
  };

  const topNavItems = ["POPULAR MOVIES", "TRENDING", "UPCOMING"];
  const bottomNavItems = ["NOW PLAYING", "TOP RATED"];

  return (
    <ul className="list-none w-full px-32 pt-8 flex justify-between z-10">
      <div className="flex gap-8">
        {topNavItems.map((item) => (
          <li
            key={item}
            onClick={() => handleNavPill(item)}
            className={`nav-pill ${
              currentCategory === item ? "nav-pill-active" : ""
            } cursor-pointer`}
          >
            {item}
          </li>
        ))}
      </div>

      <div className="flex gap-8 items-center">
        {bottomNavItems.map((item) => (
          <li
            key={item}
            onClick={() => handleNavPill(item)}
            className={`nav-pill ${
              currentCategory === item ? "nav-pill-active" : ""
            } cursor-pointer`}
          >
            {item}
          </li>
        ))}
        {/* Search Input */}
        <div className="relative group">
          <input
            type="text"
            placeholder="SEARCH MOVIES..."
            className="px-6 py-2 rounded-full text-sm uppercase tracking-widest text-[#f5e6c8] bg-[#3a1e0d]/90 border border-[#c9a15a]/50 focus:border-[#c9a15a] focus:outline-none w-[200px] placeholder-[#c9a15a]/40"
            onChange={(e) => {
              const val = e.target.value;
              const params = new URLSearchParams(searchParams.toString());
              if (val) {
                params.set("category", "SEARCH");
                params.set("query", val);
                params.set("page", "1");
              } else {
                // If cleared, go back to popular or just remove query
                params.delete("query");
                if (params.get("category") === "SEARCH") {
                   params.set("category", "POPULAR MOVIES");
                }
              }
              router.push(`/playground/chrisppa/movies?${params.toString()}`);
            }}
            defaultValue={searchParams.get("query") || ""}
          />
        </div>
      </div>
    </ul>
  );
};

export default MovieNavbar;
