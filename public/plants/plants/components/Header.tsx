import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type HeaderProps = {
  showBack?: boolean;
};

export const Header: FC<HeaderProps> = ({ showBack }) => {
  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-4">
        {showBack && (
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white hover:bg-slate-800"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Button>
          </Link>
        )}
        <h1 className="text-2xl font-bold tracking-tight">Planty</h1>
      </div>
    </header>
  );
};
