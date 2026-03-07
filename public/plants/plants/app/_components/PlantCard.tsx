import { Plant } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LikeButton } from "../../components/LikeButton";

export type PlantCardProps = {
  plant: Plant;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
};

export const PlantCard = ({ plant, isLiked, onToggleLike }: PlantCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-ring">
      <Link href={`/plant/${plant.slug}`}>
        <div className="w-full aspect-[2/3] shrink-0 pointer-events-none">
          <img
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-row items-center justify-between gap-4 pointer-events-none">
        <CardTitle className="text-lg leading-snug">
          {plant.common_name}
        </CardTitle>
        <LikeButton
          isLiked={isLiked}
          handleToggleLike={() => onToggleLike(plant.id.toString())}
        />
      </CardContent>
    </Card>
  );
};
