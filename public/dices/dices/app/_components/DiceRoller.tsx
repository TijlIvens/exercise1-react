"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dices } from "lucide-react";

type DiceRollerProps = {
  onRolled: (sum: number) => void;
};

export const DiceRoller: FC<DiceRollerProps> = ({ onRolled }) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDice1(d1);
      setDice2(d2);
      onRolled(d1 + d2);
      setIsRolling(false);
    }, 400);
  };

  const sum = dice1 + dice2;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="flex flex-col items-center gap-8 p-8">
        <div className="flex gap-6 items-center flex-wrap justify-center">
          <div
            className={`w-28 h-28 flex items-center justify-center bg-muted rounded-3xl text-5xl font-black shadow-inner border-2 transition-transform ${isRolling ? "animate-bounce scale-110" : ""}`}
          >
            {dice1}
          </div>
          <div
            className={`w-28 h-28 flex items-center justify-center bg-muted rounded-3xl text-5xl font-black shadow-inner border-2 transition-transform ${isRolling ? "animate-bounce scale-110 delay-75" : ""}`}
          >
            {dice2}
          </div>
          <div
            className={`w-32 h-32 flex items-center justify-center bg-primary text-primary-foreground rounded-3xl text-6xl font-black shadow-2xl transition-all ${isRolling ? "opacity-50 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}
          >
            {sum}
          </div>
        </div>
        <Button
          size="lg"
          className="w-full text-2xl h-16 font-bold rounded-2xl shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all"
          onClick={rollDice}
          disabled={isRolling}
        >
          <Dices className="w-8 h-8 mr-3" />
          Roll!
        </Button>
      </CardContent>
    </Card>
  );
};
