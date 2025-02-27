import { Grid, Typography, Box, Rating } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";

interface MovieDetailsHeaderProps {
  movie: {
    imgUrl: string;
    title: string;
    releaseDate: string;
    movieDirectorByMovieDirectorId?: { name: string };
    userByUserCreatorId?: { name: string };
  };
  averageRating: number;
}

export const MovieDetailsHeader = ({ movie, averageRating }: MovieDetailsHeaderProps) => (
  <Grid container spacing={4}>
    <Grid item xs={12} md={4}>
      <StyledImage 
        src={movie.imgUrl} 
        alt={movie.title} 
        width={400} 
        height={600} 
        layout="responsive" 
      />
    </Grid>
    <Grid item xs={12} md={8}>
      <Typography variant="h3" component="h1" gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {new Date(movie.releaseDate).getFullYear()} | Directed by {movie.movieDirectorByMovieDirectorId?.name}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Rating value={averageRating} readOnly precision={0.5} />
        <Typography variant="body1" ml={1}>
          {averageRating.toFixed(1)}/5
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Created By: {movie.userByUserCreatorId?.name}
      </Typography>
    </Grid>
  </Grid>
); 

const StyledImage = styled(Image)({
  borderRadius: "8px",
});