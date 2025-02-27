import { Grid } from "@mui/material";
import { Movie } from "../../state/types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieListProps {
  movies: Movie[];
}

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <>
      {movies.map((movie, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            imgUrl={movie.imgUrl || ""}
            releaseDate={movie.releaseDate}
            directorName={movie.movieDirectorByMovieDirectorId?.name || ""}
            creatorName={movie.userByUserCreatorId?.name || ""}
            rating={movie.movieReviewsByMovieId?.edges[0]?.node?.rating || 0}
          />
        </Grid>
      ))}
    </>
  );
}; 