import { FC } from "react";
import { Images, PlantDetails } from "../../../../lib/types";

export type PlantDetailImagesProps = {
  plant: PlantDetails;
};

export const PlantDetailImages: FC<PlantDetailImagesProps> = ({ plant }) => {
  return (
    <div className="flex flex-col">
      {Object.keys(plant.images).map((imageKey) => (
        <div>
          <h2 className="text-xl font-bold pl-2">
            {imageKey.charAt(0).toUpperCase() + imageKey.slice(1)}
          </h2>
          <div className="flex overflow-auto gap-2">
            {plant.images[imageKey]?.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={imageKey}
                className="max-w-xs m-2"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
