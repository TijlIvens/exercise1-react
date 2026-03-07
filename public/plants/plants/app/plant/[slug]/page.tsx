import { Header } from "../../../components/Header";
import { PlantDetailCard } from "./_components/PlantDetailCard";
import { PlantData } from "../../../lib/types";

type PlantPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PlantPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plantResult = await fetch(
    `https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/species/${slug}`,
  );
  const plant: PlantData = await plantResult.json();

  if (!plant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showBack={true} />
        <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-muted-foreground">Plant not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Header showBack={true} />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <PlantDetailCard plant={plant.data} />
      </main>
    </div>
  );
}
