import { Movies } from "../../../lib/types";
import { Header } from "../../../components/Header";
import { MovieDetailCard } from "./_components/MovieDetailCard";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const moviesData = await fetch(
    "https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies",
  );
  const movies: Movies = await moviesData.json();
  const movie = movies.find((movie) => movie.Id === id);

  if (!movie) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showBack={true} />
        <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-muted-foreground">Movie not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Header showBack={true} />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <MovieDetailCard movie={movie} />
      </main>
    </div>
  );
}
