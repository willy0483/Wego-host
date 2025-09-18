import { Star } from "lucide-react";

const Stars = ({ avgStars }: { avgStars: number }) => {
  return (
    <div className="flex ">
      {Array.from({ length: 5 }).map((_, i) =>
        i < avgStars ? (
          <Star key={i} fill="#F3CC0B" stroke="none" />
        ) : (
          <Star key={i} fill="#DFE4E7" stroke="none" />
        )
      )}
    </div>
  );
};
export default Stars;
