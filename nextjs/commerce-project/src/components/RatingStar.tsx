import { StarIcon } from "lucide-react";
import React from "react";

type Props = {
  rating: number;
};

export const RatingStar = ({ rating }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <StarIcon color="yellow" size={20} fill="yellow" />
      {rating}
    </div>
  );
};

export default RatingStar;
