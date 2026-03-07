"use client";

import { Plant } from "@/lib/types";
import { useState, FC } from "react";
import { PlantCard } from "./PlantCard";
import { PlantFilters } from "./PlantFilters";

const getInitialLikedState = (): string[] => {
  const stored = localStorage.getItem("likedPlants");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return [];
};

export type PageContentProps = {
  plants: Plant[];
};

export const PageContent: FC<PageContentProps> = ({ plants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [showLiked, setShowLiked] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>(getInitialLikedState());

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      localStorage.setItem("likedPlants", JSON.stringify(newIds));
      return newIds;
    });
  };

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
  };

  const getFilteredPlants = () => {
    let result = [...plants];
    if (appliedSearch) {
      const lowerSearch = appliedSearch.toLowerCase();
      result = result.filter((plant) =>
        plant.common_name.toLowerCase().includes(lowerSearch),
      );
    }
    if (showLiked) {
      result = result.filter((plant) => likedIds.includes(plant.id.toString()));
    }
    if (sortAlphabetically) {
      result.sort((a, b) => a.common_name.localeCompare(b.common_name));
    }
    return result;
  };

  const filteredPlants = getFilteredPlants();

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <PlantFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        showLiked={showLiked}
        onToggleShowLiked={() => setShowLiked((prev) => !prev)}
        sortAlphabetically={sortAlphabetically}
        onToggleSortAlphabetically={() =>
          setSortAlphabetically((prev) => !prev)
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            isLiked={likedIds.includes(plant.id.toString())}
            onToggleLike={handleToggleLike}
          />
        ))}
        {filteredPlants.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No plants found.
          </div>
        )}
      </div>
    </main>
  );
};
