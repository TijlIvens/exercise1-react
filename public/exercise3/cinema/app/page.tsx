import { Movies } from "../lib/types";
import { Header } from "../components/Header";
import { PageContent } from "./_components/PageContent";

export default async function Home() {
  const moviesData = await fetch(
    "https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies",
  );
  const movies: Movies = await moviesData.json();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent movies={movies} />
    </div>
  );
}
