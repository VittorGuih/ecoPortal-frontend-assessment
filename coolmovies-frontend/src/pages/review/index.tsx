import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Box, Rating, Chip } from "@mui/material";
import { useGetAllMoviesQuery } from '../../generated/graphql';
import { MovieCard } from '../../features/review/components/MovieCard/MovieCard';
import { useAppDispatch } from "../../state";
import { reviewActions } from "../../features/review/state";
import { useEffect } from "react";
import { Movie } from "../../features/review/state/types";
import { LoadingError } from "../../features/review/components/LoadingError/LoadingError";


export default function MovieReviews() {
  const { data, loading, error } = useGetAllMoviesQuery();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reviewActions.fetch());
    if (data?.allMovies) {
      dispatch(reviewActions.loaded({ data: data.allMovies.nodes as Movie[] }));
    } else {
      dispatch(reviewActions.loadError());
    }
  }, [dispatch, data]);

  
    <LoadingError loading={loading} error={error} />
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Movie Reviews
      </Typography>
      <Grid container spacing={4}>
        {data && data.allMovies?.nodes
          .filter((movie): movie is Movie => movie !== null)
          .map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                imgUrl={movie.imgUrl || ""}
                releaseDate={movie.releaseDate}
                directorName={movie.movieDirectorByMovieDirectorId?.name || ""}
                creatorName={movie.userByUserCreatorId?.name || ""}
                rating={movie.movieReviewsByMovieId?.edges.map((edge) => edge.node.rating).reduce((a, b) => a + b, 0) / movie.movieReviewsByMovieId?.edges.length || 0}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%", 
  position: "relative",
});

const StyledImage = styled(Image)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
