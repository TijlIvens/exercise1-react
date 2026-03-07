import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProductFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
};

export const ProductFilters = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      <div className="flex w-full flex-col md:flex-row items-start md:items-center gap-2">
        <div className="flex w-full md:max-w-md items-center gap-2">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={onSearch}>Search</Button>
        </div>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Link href="/cart">
          <Button className="flex-1 md:flex-none">
            <i className="fa-solid fa-cart-shopping"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
};
