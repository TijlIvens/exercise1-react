import Link from "next/link";
import { ChefHat, BookOpen, Search } from "lucide-react";

export function Header() {
  return (
    <header className="bg-orange-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold hover:text-orange-200 transition-colors"
        >
          <ChefHat className="w-6 h-6" />
          <span>Recipe Finder & Cookbook</span>
        </Link>
        <nav className="flex items-center gap-6 font-medium">
          <Link
            href="/"
            className="hover:text-orange-200 flex items-center gap-2 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Link>
          <Link
            href="/cookbook"
            className="hover:text-orange-200 flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>My Cookbook</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
