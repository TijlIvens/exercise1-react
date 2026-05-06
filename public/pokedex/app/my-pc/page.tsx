"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Database } from "lucide-react";

interface CaughtPokemon {
  name: string;
  id: number;
}

export default function MyPCPage() {
  const [pc, setPc] = useState<CaughtPokemon[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("my-pc");
    if (saved) {
      setPc(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
      <div className="w-full text-center mb-10">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Database className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          My PC
        </h1>
        <p className="text-slate-600 mb-8 text-lg max-w-2xl mx-auto">
          View all the Pokémon you've caught and saved.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {pc.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg border-2 border-dashed border-slate-300 rounded-xl">
            Your PC is empty. Go catch some Pokémon!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pc.map((pokemon) => (
              <Link
                href={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                className="group flex h-full"
              >
                <Card className="flex flex-col items-center justify-center w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-4 border-slate-200">
                  <div className="h-24 w-24 mb-2">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 rendering-pixelated"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono mb-1">
                    #{String(pokemon.id).padStart(3, "0")}
                  </span>
                  <CardTitle className="text-sm md:text-base capitalize text-slate-800 group-hover:text-red-600 transition-colors text-center">
                    {pokemon.name}
                  </CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
