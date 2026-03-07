import { Movie } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LikeButton } from "../../components/LikeButton";
import { FC } from "react";

export type MovieCardProps = {
  movie: Movie;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
};

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  isLiked,
  onToggleLike,
}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-ring">
      <Link href={`/movie/${movie.Id}`}>
        <div className="w-full aspect-[2/3] shrink-0 pointer-events-none">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-row items-center justify-between gap-4 pointer-events-none">
        <CardTitle className="text-lg leading-snug">{movie.Title}</CardTitle>
        <LikeButton
          isLiked={isLiked}
          handleToggleLike={() => onToggleLike(movie.Id)}
        />
      </CardContent>
    </Card>
  );
};
