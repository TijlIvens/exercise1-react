"use client";

import { Movies } from "@/lib/types";
import { FC, useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieFilters } from "./MovieFilters";

const getInitialLikedState = (): string[] => {
  const stored = localStorage.getItem("likedMovies");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return [];
};

export type PageContentProps = {
  movies: Movies;
};

export const PageContent: FC<PageContentProps> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [showToday, setShowToday] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>(getInitialLikedState);

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      localStorage.setItem("likedMovies", JSON.stringify(newIds));
      return newIds;
    });
  };

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
  };

  const getFilteredMovies = () => {
    let result = [...movies];
    if (appliedSearch) {
      const lowerSearch = appliedSearch.toLowerCase();
      result = result.filter((m) =>
        m.Title.toLowerCase().includes(lowerSearch),
      );
    }
    if (showToday) {
      result = result.filter((m) => m.PlaysToday);
    }
    if (sortAlphabetically) {
      result.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    return result;
  };

  const filteredMovies = getFilteredMovies();

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <MovieFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        showToday={showToday}
        onToggleShowToday={() => setShowToday((prev) => !prev)}
        sortAlphabetically={sortAlphabetically}
        onToggleSortAlphabetically={() =>
          setSortAlphabetically((prev) => !prev)
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.Id}
            movie={movie}
            isLiked={likedIds.includes(movie.Id)}
            onToggleLike={handleToggleLike}
          />
        ))}
        {filteredMovies.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No movies found.
          </div>
        )}
      </div>
    </main>
  );
};
