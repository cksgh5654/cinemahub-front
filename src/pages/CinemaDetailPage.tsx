import { FC, useEffect, useRef, useState } from "react";
import { useTrendingMoviesStore } from "../store/useTrendingMovieStore";
import { movieDetail, movieImages, moviePosters } from "../apis/movie";
import XIcon from "../icons/XIcon";
import MuteIcon from "../icons/MuteIcon";
import UnMuteIcon from "../icons/UnMuteIcon";
import { useNavigate } from "react-router-dom";
import { genres } from "@consts/genres";
import { useModalOpenStore } from "../store/useModalOpenStore";
import defaultImage from "../assets/images/defaultImage.jpg";
import FavoritesBtn from "../components/mainpage/FavoritesBtn";
import StarYellowIcon from "../icons/StarYellowIcon";
import { reviewScore } from "../apis/review";
import { Modal, Pagination } from "parkchanho-react-ui-kit";
interface CinemaDetailPageProps {
  movieId: string;
}

interface Actor {
  id: string;
  name: string;
  character: string;
  profilePath: string;
}

interface Director {
  id: string;
  name: string;
  profilePath: string;
}

interface Movie {
  movieId: string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  genreIds: number[];
  trailer: string | null;
  logoPath: string | null;
  koreanRating: string;
  runtime: number;
  tagline: string;
  actor: Actor[];
  director: Director[];
}

interface Review {
  totalStarScore: number;
  totalCount: number;
}

const imagePageSize = 8;
const posterPageSize = 5;
const blockSize = 15;

const CinemaDetailPage: FC<CinemaDetailPageProps> = ({ movieId }) => {
  const { trendingDayMovies } = useTrendingMoviesStore();
  const [posters, setPosters] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [currentPosterPage, setCurrentPosterPage] = useState(0);
  const [currentImagePage, setCurrentImagePage] = useState(0);
  const [posterCount, setPosterCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const portalref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    setIsMovieOpen,
    setSelectedMovie,
    setIsPersonOpen,
    setSelectedPerson,
  } = useModalOpenStore();
  const [review, setReview] = useState<Review>({
    totalStarScore: 0,
    totalCount: 0,
  });
  const [movie, setMovie] = useState<Movie | null>(null);
  const currentUrl = new URL(window.location.href);

  const fetchData = async () => {
    try {
      const [posters, images, review] = await Promise.all([
        moviePosters(movieId, 0, posterPageSize),
        movieImages(movieId, 0, imagePageSize),
        reviewScore(movieId),
      ]);
      setPosters(posters.posters);
      setPosterCount(posters.totalCount);
      setImages(images.images);
      setImageCount(images.totalCount);
      setReview({
        totalStarScore:
          review.reviewScore.totalStarScore % 1 === 0
            ? `${review.reviewScore.totalStarScore}.0`
            : review.reviewScore.totalStarScore.toFixed(1),
        totalCount: review.reviewLength,
      });
    } catch (err) {
      console.error("fetchData 에러 ", err);
    }
  };

  const fetchMovie = async () => {
    try {
      const response = await movieDetail(movieId);
      setMovie(response);
    } catch (err) {
      console.error("fetchMovie 에러 ", err);
    }
  };

  const foundMovie = trendingDayMovies.find((m) => m.movieId === movieId);

  useEffect(() => {
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      fetchMovie();
    }
  }, [movieId, trendingDayMovies]);

  useEffect(() => {
    fetchData();
  }, []);

  const posterPageMove = async () => {
    const posters = await moviePosters(
      movieId,
      currentPosterPage,
      posterPageSize
    );
    setPosters(posters.posters);
  };

  useEffect(() => {
    posterPageMove();
  }, [currentPosterPage]);

  const imagePageMove = async () => {
    const images = await movieImages(movieId, currentImagePage, imagePageSize);
    setImages(images.images);
  };

  useEffect(() => {
    imagePageMove();
  }, [currentImagePage]);

  const handlePosterPageChange = (page: number) => {
    setCurrentPosterPage(page);
  };

  const handleImagePageChange = (page: number) => {
    setCurrentImagePage(page);
  };

  const handleModalOpen = (content: string) => {
    setIsModalOpen(true);
    setContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);
  return (
    <>
      {movie && (
        <>
          <title>{`${movie.title} | CinemaHub`}</title>
          <meta
            name="description"
            content={movie.tagline || movie.overview || "설명이 없습니다."}
          />
        </>
      )}
      <main
        ref={portalref}
        className="flex flex-col gap-8 items-center bg-white w-[1280px] rounded-2xl pb-16"
      >
        <div className="w-full relative">
          {movie?.trailer ? (
            <>
              <div className="w-full h-[692px]">
                <iframe
                  className="w-full h-full rounded-t-2xl"
                  src={`https://www.youtube.com/embed/${
                    movie.trailer
                  }?autoplay=1&loop=1&playlist=${movie.trailer}&mute=${
                    isMuted ? "1" : "0"
                  }&controls=0&modestbranding=1`}
                  allow="autoplay; fullscreen"
                ></iframe>
              </div>
              <button
                onClick={toggleMute}
                className="absolute top-1 left-1 z-1 bg-black/50 p-[0.5vw] rounded-full hover:bg-black/70 transition"
              >
                {isMuted ? (
                  <MuteIcon className="h-[2vw]" />
                ) : (
                  <UnMuteIcon className="h-[2vw]" />
                )}
              </button>
            </>
          ) : (
            <div className="w-full h-[692px] rounded-t-2xl">
              <div
                className="w-full h-full bg-cover bg-center rounded-t-2xl"
                style={
                  movie?.backdropPath
                    ? {
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdropPath})`,
                      }
                    : { backgroundImage: `url(${defaultImage})` }
                }
              ></div>
            </div>
          )}
          <div
            className="flex absolute inset-y-0 left-0 w-full rounded-t-2xl bg-black/50 backdrop-blur-[20px]"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black, transparent)",
              maskImage: "linear-gradient(to right, black, transparent)",
            }}
          ></div>
          <div className="flex flex-col absolute inset-y-0 left-16 h-[692] top-0 text-white">
            <div className="flex flex-col gap-4 justify-end pb-24 h-full">
              {movie?.logoPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.logoPath}`}
                  alt={movie?.title}
                  className="pb-[2vw] max-w-[400px] max-h-[250px]"
                  onDragStart={(e) => e.preventDefault()}
                />
              ) : (
                <h1 className="text-6xl text-white font-bold">
                  {movie?.title}
                </h1>
              )}

              {review.totalCount > 0 ? (
                <div className="flex gap-2">
                  <StarYellowIcon className="w-5" />
                  <p className="text-xl">{`${review.totalStarScore} (${review.totalCount})`}</p>
                </div>
              ) : (
                <p className="text-xl">리뷰가 없습니다.</p>
              )}
              <button
                onClick={() => {
                  setIsMovieOpen(false),
                    setSelectedMovie(null),
                    navigate(`/review?movie=${movieId}`);
                }}
                className="py-4 w-80 text-xl bg-red-500/80 rounded-lg hover:bg-red-500 backdrop-blur-xs transition ease-in-out"
              >
                리뷰보기
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-8 px-8">
          <div className="relative">
            <img
              src={
                movie?.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  : defaultImage
              }
              alt={movie?.title}
              className="object-cover w-full h-full"
              onDragStart={(e) => e.preventDefault()}
            />
            <FavoritesBtn
              favoriteType="Movie"
              favoriteId={movieId}
              className="border absolute top-4 left-4 border-gray-200 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <dl>
              <dt className="text-xl pb-2">개봉일</dt>
              <dd className="text-lg text-gray-500">{movie?.releaseDate}</dd>
            </dl>
            <hr className="w-full border border-gray-300"></hr>
            <dl>
              <dt className="text-xl pb-2">장르</dt>
              <dd className="flex gap-4 text-lg text-gray-500">
                {movie?.genreIds.map((genreId) => (
                  <span
                    key={`cinema detail genre ${genreId}`}
                    className="bg-[rgba(0,0,0,0.4)] py-2 px-4 rounded-md text-white text-base"
                  >
                    {genres.find((genre) => genre.id === genreId)?.name}
                  </span>
                ))}
              </dd>
            </dl>
            <hr className="w-full border border-gray-300"></hr>
            <dl>
              <dt className="text-xl pb-2">출연</dt>
              <dd className="flex gap-4 text-lg text-gray-500">
                {movie?.actor.map((actor) => (
                  <span
                    key={`cinema detail actor ${actor.id}`}
                    onClick={() => {
                      setIsMovieOpen(false),
                        setSelectedMovie(null),
                        setIsPersonOpen(true),
                        setSelectedPerson(actor.id);
                      currentUrl.search = "";
                      currentUrl.searchParams.set("person", actor.id);
                      navigate(currentUrl.pathname + currentUrl.search);
                    }}
                    className="cursor-pointer"
                  >
                    {actor.name}
                  </span>
                ))}
              </dd>
            </dl>
            <hr className="w-full border border-gray-300"></hr>
            <dl>
              <dt className="text-xl pb-2">감독</dt>
              <dd className="flex gap-4 text-lg text-gray-500">
                {movie?.director.map((director) => (
                  <span
                    key={`cinema-detail-director-${director.id}`}
                    onClick={() => {
                      setIsMovieOpen(false),
                        setSelectedMovie(null),
                        setIsPersonOpen(true),
                        setSelectedPerson(director.id);
                      currentUrl.search = "";
                      currentUrl.searchParams.set("person", director.id);
                      navigate(currentUrl.pathname + currentUrl.search);
                    }}
                    className="cursor-pointer"
                  >
                    {director.name}
                  </span>
                ))}
              </dd>
            </dl>
            <hr className="w-full border border-gray-300"></hr>
            <dl>
              <dt className="text-xl pb-2">런타임</dt>
              <dd className="text-lg text-gray-500">{movie?.runtime} 분</dd>
            </dl>
            <hr className="w-full border border-gray-300"></hr>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-[1280px] items-center px-8">
          <div className="w-[1280px] flex flex-col gap-8 px-8">
            <hr className="w-full border border-gray-300"></hr>
            {movie?.overview && (
              <>
                <section className="flex flex-col gap-4 w-full">
                  <h2 className="text-2xl text-slate-900">줄거리</h2>
                  <p className="text-lg text-slate-500">{movie?.overview}</p>
                </section>
                <hr className="w-full border border-gray-300"></hr>
              </>
            )}

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl text-slate-900">포스터</h2>
              <div className="flex flex-col gap-8 items-center w-full justify-between">
                <div className="flex gap-4 w-full">
                  {posters.map((poster) => {
                    return (
                      <div
                        key={`cinema-detail-poster-${poster}`}
                        onClick={() => handleModalOpen(poster)}
                        className="w-[230px] h-[350px]"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w185${poster}`}
                          alt="poster"
                          className="object-cover w-full h-full"
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </div>
                    );
                  })}
                </div>
                <Pagination
                  total={posterCount}
                  value={currentPosterPage}
                  onPageChange={handlePosterPageChange}
                  blockSize={blockSize}
                  pageSize={posterPageSize}
                >
                  <Pagination.Navigator className="flex gap-4">
                    <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                  </Pagination.Navigator>
                </Pagination>
              </div>
            </section>
            <hr className="w-full border border-gray-300"></hr>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl text-slate-900">스틸이미지</h2>
              <div className="flex flex-col gap-8 items-center w-full justify-between">
                <div className="flex gap-4 w-full flex-wrap">
                  {images.map((image) => {
                    return (
                      <div
                        key={`cinema-detail-image-${image}`}
                        onClick={() => {
                          handleModalOpen(image);
                        }}
                        className="w-[292px] h-[170px]"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w342${image}`}
                          alt="poster"
                          className="object-cover w-full h-full flex-shrink-0"
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </div>
                    );
                  })}
                </div>
                <Pagination
                  total={imageCount}
                  value={currentImagePage}
                  onPageChange={handleImagePageChange}
                  blockSize={blockSize}
                  pageSize={imagePageSize}
                >
                  <Pagination.Navigator className="flex gap-4">
                    <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                  </Pagination.Navigator>
                </Pagination>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Modal
        onCloseModal={closeModal}
        open={isModalOpen}
        portalref={portalref.current}
      >
        <Modal.Content className="z-4 top-[50%] transform -translate-y-1/2 shadow-2xl">
          <Modal.Close>
            <XIcon className="fixed top-2 right-4 w-8" />
          </Modal.Close>
          <img
            src={`https://image.tmdb.org/t/p/w780${content}`}
            alt="poster"
            onDragStart={(e) => e.preventDefault()}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CinemaDetailPage;
