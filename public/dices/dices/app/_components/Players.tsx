"use client";

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, UserPlus, Users } from "lucide-react";

type PlayersProps = {
  players: string[];
  currentPlayerIndex: number;
  onAddPlayer: (name: string) => void;
};

export const Players: FC<PlayersProps> = ({
  players,
  currentPlayerIndex,
  onAddPlayer,
}) => {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (newName.trim()) {
      onAddPlayer(newName.trim());
      setNewName("");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden">
      <CardHeader className="bg-muted/30 border-b pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Players
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-3">
          <Input
            placeholder="Add player name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 h-12 text-lg rounded-xl"
          />
          <Button
            onClick={handleAdd}
            className="h-12 px-6 rounded-xl shadow-md"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {players.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 opacity-60 flex flex-col items-center gap-3">
              <User className="w-12 h-12" />
              <p className="font-medium text-lg">No players added.</p>
            </div>
          ) : (
            players.map((player, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 flex justify-between items-center transition-all ${
                  idx === currentPlayerIndex
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.03] z-10 relative"
                    : "bg-card text-card-foreground hover:bg-muted/50 border-transparent hover:border-muted-foreground/20"
                }`}
              >
                <span className="font-bold text-lg flex items-center gap-3">
                  <User
                    className={`w-5 h-5 ${idx === currentPlayerIndex ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                  {player}
                </span>
                {idx === currentPlayerIndex && (
                  <span className="text-sm uppercase tracking-widest opacity-90 font-black bg-primary-foreground/20 px-3 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
