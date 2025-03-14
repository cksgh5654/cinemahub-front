import { create } from "zustand";

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

interface TrendingDayMovie {
  movieId: string;
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: string;
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

interface TrendingWeekMovie {
  movieId: string;
  title: string;
  releaseDate: string;
  posterPath: string;
  genreIds: number[];
}

interface TrendingMoviesState {
  trendingDayMovies: TrendingDayMovie[];
  trendingWeekMovies: TrendingWeekMovie[];
  setTrendingDayMovie: (movies: TrendingDayMovie[]) => void;
  setTrendingWeekMovie: (movies: TrendingWeekMovie[]) => void;
}

export const useTrendingMoviesStore = create<TrendingMoviesState>((set) => ({
  trendingDayMovies: [],
  trendingWeekMovies: [],
  setTrendingDayMovie: (movies) => set({ trendingDayMovies: movies }),
  setTrendingWeekMovie: (movies) => set({ trendingWeekMovies: movies }),
}));
