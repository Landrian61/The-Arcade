import MovieDetails from "@/components/movies/MovieDetails";

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full flex justify-center mt-32 text-white">
      <MovieDetails id={params.id} />
    </div>
  );
}

