import { StarIcon } from "@/icons";

type RatingComponentProps = {
  rating: number;
};

export const RatingComponent = ({ rating }: RatingComponentProps) => {
  return (
    <>
      <div className="flex gap-4">
        <StarIcon className="h-3 w-3 bg-yellow-500" />
        <h5 className="card-title font-bold">{rating}</h5>
      </div>
    </>
  );
};

export default RatingComponent;
