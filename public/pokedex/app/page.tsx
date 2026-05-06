"use client";

import { useState, useEffect } from "react";
import { PokemonListItem, PokemonListResponse } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchPokemons(offset);
  }, [offset]);

  const fetchPokemons = async (currentOffset: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`
      );
      const data: PokemonListResponse = await res.json();
      setPokemons(data.results);
    } catch (error) {
      console.error("Failed to fetch pokemons", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to extract ID from URL
  const getPokemonId = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow flex flex-col items-center">
      <div className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Explore the Pokédex
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Search for Pokémon by name or browse the list.
        </p>

        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="e.g. pikachu, bulbasaur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-lg py-6"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <Card key={i} className="flex flex-col items-center justify-center p-4">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4" />
              </Card>
            ))}
          </div>
        ) : filteredPokemons.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg border-2 border-dashed border-slate-300 rounded-xl">
            No Pokémon found matching "{searchTerm}".
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPokemons.map((pokemon) => {
                const id = getPokemonId(pokemon.url);
                return (
                  <Link
                    href={`/pokemon/${pokemon.name}`}
                    key={pokemon.name}
                    className="group flex h-full"
                  >
                    <Card className="flex flex-col items-center justify-center w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-4 border-slate-200">
                      <div className="h-24 w-24 mb-2">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                          alt={pokemon.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 rendering-pixelated"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-mono mb-1">
                        #{id.padStart(3, '0')}
                      </span>
                      <CardTitle className="text-sm md:text-base capitalize text-slate-800 group-hover:text-red-600 transition-colors text-center">
                        {pokemon.name}
                      </CardTitle>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {!searchTerm && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                  disabled={offset === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <span className="text-slate-600 font-medium">
                  Page {Math.floor(offset / limit) + 1}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setOffset(offset + limit)}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
