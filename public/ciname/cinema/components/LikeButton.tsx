import { Button } from "./ui/button";

type LikeButtonProps = {
  isLiked: boolean;
  handleToggleLike: () => void;
};

export const LikeButton = ({ isLiked, handleToggleLike }: LikeButtonProps) => {
  return (
    <div className="pointer-events-auto z-10">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={handleToggleLike}
      >
        <i
          className={`fa-solid fa-heart text-2xl ${isLiked ? "text-red-500" : "text-gray-300"}`}
        ></i>
      </Button>
    </div>
  );
};
