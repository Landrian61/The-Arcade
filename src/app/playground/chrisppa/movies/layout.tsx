import Image from "next/image";
import MovieNavbar from "@/components/movies/MovieNavbar";
import { Suspense } from "react";

export default function MoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/cris/bg.png')",
      }}
    >
      <Image
        src="/images/cris/movie_logo2.png"
        width={350}
        height={300}
        alt="movie logo"
        className="absolute -top-20"
        priority
      />

      <Suspense fallback={<div className="h-16 w-full"></div>}>
        <MovieNavbar />
      </Suspense>

      {children}
    </div>
  );
}