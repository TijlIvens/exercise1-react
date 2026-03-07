"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/_components/Header";
import { DiceRoller } from "@/app/_components/DiceRoller";
import { History } from "@/app/_components/History";
import { Players } from "@/app/_components/Players";

const getInitialHistory = () => {
  const savedHistory = localStorage.getItem("diceHistory");
  return savedHistory ? JSON.parse(savedHistory) : [];
};

const getInitialPlayers = () => {
  const savedPlayers = localStorage.getItem("dicePlayers");
  return savedPlayers ? JSON.parse(savedPlayers) : [];
};

const getInitialCurrentPlayerIndex = () => {
  const savedIndex = localStorage.getItem("diceCurrentPlayerIndex");
  return savedIndex ? JSON.parse(savedIndex) : 0;
};

export default function Home() {
  const [history, setHistory] = useState<number[]>(getInitialHistory);
  const [players, setPlayers] = useState<string[]>(getInitialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
    getInitialCurrentPlayerIndex,
  );

  const handleRolled = (sum: number) => {
    const newHistory = [...history, sum];
    setHistory(newHistory);
    localStorage.setItem("diceHistory", JSON.stringify(newHistory));
    if (players.length > 0) {
      const newCurrentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(newCurrentPlayerIndex);
      localStorage.setItem(
        "diceCurrentPlayerIndex",
        JSON.stringify(newCurrentPlayerIndex),
      );
    }
  };

  const handleAddPlayer = (name: string) => {
    const newPlayers = [...players, name];
    setPlayers(newPlayers);
    localStorage.setItem("dicePlayers", JSON.stringify(newPlayers));
  };

  const handleReset = () => {
    setHistory([]);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    localStorage.removeItem("diceHistory");
    localStorage.removeItem("dicePlayers");
    localStorage.removeItem("diceCurrentPlayerIndex");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50  pb-16">
      <Header />
      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <DiceRoller onRolled={handleRolled} />
            <Players
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              onAddPlayer={handleAddPlayer}
            />
          </div>
          <div className="lg:col-span-4 h-[750px] sticky top-8">
            <History history={history} onReset={handleReset} />
          </div>
        </div>
      </main>
    </div>
  );
}
