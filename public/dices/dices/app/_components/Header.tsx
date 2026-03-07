import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-primary text-primary-foreground py-6 text-center shadow-lg mb-8 border-b-4 border-primary/50">
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
        Dice-it
      </h1>
    </header>
  );
};
