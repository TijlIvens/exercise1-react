"use client";

import { Movie } from "@/lib/types";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LikeButton } from "../../../../components/LikeButton";

const getInitialLikedState = (movie: Movie) => {
  const stored = localStorage.getItem("likedMovies");
  if (stored) {
    try {
      const likedIds = JSON.parse(stored) as string[];
      return likedIds.includes(movie.Id);
    } catch {}
  }
  return false;
};

export const MovieDetailCard = ({ movie }: { movie: Movie }) => {
  const [isLiked, setIsLiked] = useState<boolean>(getInitialLikedState(movie));

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      const stored = localStorage.getItem("likedMovies");
      let likedIds: string[] = [];
      if (stored) {
        try {
          likedIds = JSON.parse(stored);
        } catch {}
      }
      if (newState) {
        likedIds.push(movie.Id);
      } else {
        likedIds = likedIds.filter((id) => id !== movie.Id);
      }
      localStorage.setItem("likedMovies", JSON.stringify(likedIds));
      return newState;
    });
  };

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden p-0 flex flex-col md:flex-row shadow-lg">
      <div className="md:w-[40%] shrink-0 flex flex-col bg-muted/20">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-auto object-cover"
        />
        {movie.Images && movie.Images.length > 0 && (
          <div className="flex overflow-x-auto gap-2 max-h-40 p-2">
            {movie.Images.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`Scene ${i + 1}`}
                className="h-full object-fit"
              />
            ))}
          </div>
        )}
      </div>

      <div className="md:w-[60%] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {movie.Title}
          </h1>
          <LikeButton isLiked={isLiked} handleToggleLike={handleToggleLike} />
        </div>

        <div className="text-xl font-medium text-foreground">
          {movie.Runtime} - Room: {movie.Room}
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.Genre.map((g) => (
            <span
              key={g}
              className="inline-flex items-center rounded-md border border-transparent bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
            >
              {g}
            </span>
          ))}
        </div>

        <p className="text-lg leading-relaxed text-foreground mt-2">
          {movie.Plot}
        </p>

        <div className="flex flex-col gap-3 mt-4 text-lg">
          <div>
            <span className="font-bold">Writer:</span> {movie.Writer}
          </div>
          <div>
            <span className="font-bold">Director:</span> {movie.Director}
          </div>
          <div>
            <span className="font-bold">Actors:</span>{" "}
            {movie.Actors.join(" - ")}
          </div>
        </div>
      </div>
    </Card>
  );
};
