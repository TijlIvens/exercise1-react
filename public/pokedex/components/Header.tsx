import Link from "next/link";
import { Search, Database } from "lucide-react";

export function Header() {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold hover:text-red-200 transition-colors"
        >
          <div className="w-6 h-6 rounded-full border-4 border-white bg-red-400 relative overflow-hidden">
             <div className="absolute top-1/2 w-full h-[2px] bg-white transform -translate-y-1/2"></div>
             <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span>Pokédex Explorer</span>
        </Link>
        <nav className="flex items-center gap-6 font-medium">
          <Link
            href="/"
            className="hover:text-red-200 flex items-center gap-2 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Link>
          <Link
            href="/my-pc"
            className="hover:text-red-200 flex items-center gap-2 transition-colors"
          >
            <Database className="w-5 h-5" />
            <span>My PC</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
