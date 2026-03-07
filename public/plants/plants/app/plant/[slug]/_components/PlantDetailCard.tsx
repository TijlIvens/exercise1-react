"use client";

import { PlantDetails } from "@/lib/types";
import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { LikeButton } from "../../../../components/LikeButton";
import { PlantDetailImages } from "./PlantDetailImages";

const getLikedItemsFromStorage = (): string[] => {
  const stored = localStorage.getItem("likedPlants");
  if (stored) {
    try {
      return JSON.parse(stored) as string[];
    } catch {}
  }
  return [];
};

const getInitialLikedState = (plantId: string): boolean => {
  const storedIds = getLikedItemsFromStorage();

  return storedIds.includes(plantId);
};

export type PlantDetailCardProps = {
  plant: PlantDetails;
};

export const PlantDetailCard: FC<PlantDetailCardProps> = ({ plant }) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    getInitialLikedState(plant.id.toString()),
  );

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;

      const storesIds = getLikedItemsFromStorage();
      if (newState) {
        const newStoredIds = [...storesIds, plant.id.toString()];
        localStorage.setItem("likedPlants", JSON.stringify(newStoredIds));
      } else {
        const newStoredIds = storesIds.filter(
          (id) => id !== plant.id.toString(),
        );
        localStorage.setItem("likedPlants", JSON.stringify(newStoredIds));
      }

      return newState;
    });
  };

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden p-0 flex flex-col shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[40%] shrink-0 flex flex-col bg-muted/20">
          <img
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="md:w-[60%] p-6 md:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {plant.common_name}
            </h1>
            <LikeButton isLiked={isLiked} handleToggleLike={handleToggleLike} />
          </div>

          <div className="flex flex-col gap-3 mt-4 text-lg">
            <div>
              <span className="font-bold">Scientific name:</span>{" "}
              {plant.scientific_name}
            </div>
            <div>
              <span className="font-bold">Bibliography:</span>{" "}
              {plant.bibliography}
            </div>
            <div>
              <span className="font-bold">Author:</span> {plant.author}
            </div>
            <div>
              <span className="font-bold">Observations:</span>{" "}
              {plant.observations}
            </div>
            <div>
              <span className="font-bold">Synonyms:</span>{" "}
              <div className="flex flex-wrap gap-2">
                {plant.synonyms.map((synonym) => (
                  <span
                    key={synonym.id}
                    className="inline-flex items-center rounded-md border border-transparent bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
                  >
                    {synonym.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold">Sources:</span>{" "}
              <div className="flex flex-wrap gap-2">
                {plant.sources.map((source) => (
                  <span
                    key={source.id}
                    className="inline-flex items-center rounded-md border border-transparent bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground "
                  >
                    {source.url ? (
                      <a className="text-blue-500" href={source.url}>
                        {source.name}
                      </a>
                    ) : (
                      source.name
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlantDetailImages plant={plant} />
    </Card>
  );
};
