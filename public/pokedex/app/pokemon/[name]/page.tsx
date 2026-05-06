"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PokemonDetail } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Database } from "lucide-react";
import Link from "next/link";

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaught, setIsCaught] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (name) {
      fetchPokemon();
    }
  }, [name, router]);

  useEffect(() => {
    if (pokemon) {
      const saved = localStorage.getItem("my-pc");
      if (saved) {
        const pc = JSON.parse(saved);
        setIsCaught(pc.some((p: any) => p.name === pokemon.name));
      }
    }
  }, [pokemon]);

  const toggleCatch = () => {
    if (!pokemon) return;

    const saved = localStorage.getItem("my-pc");
    let pc = saved ? JSON.parse(saved) : [];

    if (isCaught) {
      pc = pc.filter((p: any) => p.name !== pokemon.name);
    } else {
      pc.push({ name: pokemon.name, id: pokemon.id });
    }

    localStorage.setItem("my-pc", JSON.stringify(pc));
    setIsCaught(!isCaught);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" disabled className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-1/3" />
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-64 h-64 rounded-xl" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
      <Link href="/">
        <Button variant="ghost" className="mb-6 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pokédex
        </Button>
      </Link>

      <Card className="overflow-hidden border-2 border-slate-200 shadow-lg">
        <div className="bg-slate-100 flex justify-between items-start p-6 pb-0">
          <div>
            <span className="text-xl text-slate-500 font-mono block mb-2">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <CardTitle className="text-4xl md:text-5xl capitalize font-bold text-slate-800">
              {pokemon.name}
            </CardTitle>
          </div>
          <Button
            onClick={toggleCatch}
            variant={isCaught ? "default" : "outline"}
            className={isCaught ? "bg-red-600 hover:bg-red-700" : "border-red-200 hover:bg-red-50 text-red-600"}
          >
            <Database className="w-4 h-4 mr-2" />
            {isCaught ? "Release" : "Catch!"}
          </Button>
        </div>

        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start bg-slate-100">
          <div className="w-64 h-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex items-center justify-center">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="flex-1 w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
              Data
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-500">Height</p>
                <p className="font-medium">{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Weight</p>
                <p className="font-medium">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
              Types
            </h3>
            <div className="flex gap-2 mb-6">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-medium capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
              Base Stats
            </h3>
            <div className="space-y-3">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center">
                  <span className="w-32 text-sm text-slate-600 capitalize">
                    {s.stat.name.replace("-", " ")}
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-medium ml-4">
                    {s.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
