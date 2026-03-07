import { PlantsData } from "../lib/types";
import { Header } from "../components/Header";
import { PageContent } from "./_components/PageContent";

export default async function Home() {
  const plantsResult = await fetch(
    "https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/plants",
  );
  const plants: PlantsData = await plantsResult.json();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent plants={plants.data} />
    </div>
  );
}
