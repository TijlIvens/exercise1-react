import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type PlantFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
  showLiked: boolean;
  onToggleShowLiked: () => void;
  sortAlphabetically: boolean;
  onToggleSortAlphabetically: () => void;
};

export const PlantFilters = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  showLiked,
  onToggleShowLiked,
  sortAlphabetically,
  onToggleSortAlphabetically,
}: PlantFiltersProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      <div className="flex w-full md:max-w-md items-center gap-2">
        <Input
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={onSearch}>Search</Button>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button
          variant={showLiked ? "default" : "secondary"}
          onClick={onToggleShowLiked}
          className="flex-1 md:flex-none"
        >
          Show Liked
        </Button>
        <Button
          variant={sortAlphabetically ? "default" : "secondary"}
          onClick={onToggleSortAlphabetically}
          className="flex-1 md:flex-none"
        >
          Sort Alphabetically
        </Button>
      </div>
    </div>
  );
};
