import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 to 5
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showScore?: boolean;
  count?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showScore = false,
  count
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4 md:w-5 md:h-5',
    lg: 'w-6 h-6 md:w-7 md:h-7'
  };

  const currentVal = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }).map((_, i) => {
          const starIndex = i + 1;
          const isFilled = starIndex <= Math.round(currentVal);

          return (
            <button
              type="button"
              key={i}
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starIndex)}
              onMouseEnter={() => interactive && setHoverRating(starIndex)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${
                interactive
                  ? 'cursor-pointer hover:scale-115 transition-transform duration-150 p-0.5'
                  : 'cursor-default pointer-events-none'
              }`}
              aria-label={`Calificar con ${starIndex} estrellas`}
            >
              <Star
                className={`${starSizes[size]} transition-colors duration-200 ${
                  isFilled
                    ? 'fill-gold-400 text-gold-500 drop-shadow-xs'
                    : 'fill-stone-100 text-stone-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="font-semibold text-xs md:text-sm text-stone-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span className="text-xs text-stone-400">
          ({count} {count === 1 ? 'reseña' : 'reseñas'})
        </span>
      )}
    </div>
  );
};
