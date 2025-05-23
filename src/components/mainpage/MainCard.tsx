import { FC, useEffect, useState } from "react";
import { genres } from "@consts/genres";
import UnMuteIcon from "../../icons/UnMuteIcon";
import MuteIcon from "../../icons/MuteIcon";
import { useNavigate } from "react-router-dom";
import { reviewScore } from "../../apis/review";
import StarYellowIcon from "../../icons/StarYellowIcon";
import FavoritesBtn from "./FavoritesBtn";

interface MovieProps {
  movieId: string;
  title: string;
  releaseDate: string;
  backdropPath: string;
  genreIds: number[];
  trailer: string | null;
  logoPath: string | null;
  koreanRating: string;
  carouselIndex: number;
  index: number;
}

interface Review {
  totalStarScore: number;
  totalCount: number;
}

const MainCard: FC<MovieProps> = ({
  movieId,
  title,
  releaseDate,
  backdropPath,
  genreIds,
  trailer,
  logoPath,
  koreanRating,
  carouselIndex,
  index,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [trailerKey, setTrailerKey] = useState(0);
  const navigate = useNavigate();

  const [review, setReview] = useState<Review>({
    totalStarScore: 0,
    totalCount: 0,
  });

  const fetchReview = async () => {
    try {
      const review = await reviewScore(movieId);
      setReview({
        totalStarScore:
          review.reviewScore.totalStarScore % 1 === 0
            ? `${review.reviewScore.totalStarScore}.0`
            : review.reviewScore.totalStarScore.toFixed(1),
        totalCount: review.reviewLength,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  useEffect(() => {
    if (carouselIndex === index && trailer) {
      const timer = setTimeout(() => {
        setShowTrailer(true);
        setTrailerKey((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowTrailer(false);
    }
  }, [carouselIndex, index, trailer]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <div className="relative bg-cover bg-center w-full h-[45vw] flex items-center rounded-3xl text-white">
      <FavoritesBtn
        favoriteType="Movie"
        favoriteId={movieId}
        className="absolute top-4 left-4 border border-gray-200 rounded-full z-1"
      />
      <div className="absolute inset-0 rounded-3xl transition-opacity duration-1000 ease-in-out">
        {trailer && showTrailer && (
          <iframe
            key={trailerKey}
            className="absolute top-0 left-0 w-full h-full rounded-3xl transition-opacity duration-1000 ease-in-out"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&loop=1&playlist=${trailer}&mute=${
              isMuted ? "1" : "0"
            }&controls=0&modestbranding=1`}
            allow="autoplay; fullscreen"
          ></iframe>
        )}

        <div
          className={`absolute inset-0 bg-cover bg-center rounded-3xl transition-opacity duration-1000 ease-in-out ${
            showTrailer ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})`,
          }}
        ></div>
      </div>

      <div
        className="absolute inset-y-0 left-0 w-full rounded-l-3xl bg-black/50 backdrop-blur-[20px]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
          maskImage: "linear-gradient(to right, black, transparent)",
        }}
      ></div>

      {trailer && showTrailer && (
        <button
          onClick={toggleMute}
          className="absolute top-[2vw] right-[2vw] bg-black/50 p-[0.5vw] rounded-full hover:bg-black/70 transition"
        >
          {isMuted ? (
            <MuteIcon className="h-[2vw]" />
          ) : (
            <UnMuteIcon className="h-[2vw]" />
          )}
        </button>
      )}

      <div
        className="relative flex flex-col gap-[1vw] pl-[5vw] w-[40vw] text-[1.5vw]"
        style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex items-center">
          {logoPath ? (
            <img
              src={`https://image.tmdb.org/t/p/original${logoPath}`}
              alt={title}
              className="pb-[2vw] max-w-[36vw] max-h-[25vw]"
              onDragStart={(e) => e.preventDefault()}
            />
          ) : (
            <h1 className="pb-[2vw] text-[4vw]/[5vw] font-bold">{title}</h1>
          )}
        </div>
        <div>{releaseDate}</div>
        <div className="flex gap-2">
          {genreIds.map((genreId) => (
            <div
              key={genreId}
              className="bg-[rgba(0,0,0,0.4)] py-1 px-2 rounded-md"
            >
              {genres.find((genre) => genre.id === genreId)?.name}
            </div>
          ))}
        </div>

        {review.totalCount > 0 ? (
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <StarYellowIcon className="w-5" />
              <p className="text-xl">{`${review.totalStarScore} (${review.totalCount})`}</p>
            </div>
            <div className="bg-gray-600 px-2 rounded text-base">
              {koreanRating}
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <p className="text-xl">리뷰가 없습니다.</p>
            <div className="bg-gray-600 px-2 rounded text-base">
              {koreanRating}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            navigate(`?movie=${movieId}`), setIsMuted(true);
          }}
          className="py-[1vw] text-[1.5vw] cursor-pointer bg-red-500/80 rounded-[1vw] hover:bg-red-500 backdrop-blur-xs transition ease-in-out"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
};

export default MainCard;
