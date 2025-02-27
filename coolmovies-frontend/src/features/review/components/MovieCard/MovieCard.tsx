import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Typography, Card, CardContent, CardMedia, Box, Rating, Chip } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%", // 16:9 aspect ratio
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

interface MovieCardProps {
  id: string;
  title: string;
  imgUrl: string;
  releaseDate: string;
  directorName: string;
  creatorName: string;
  rating: number;
}

export const MovieCard = ({ id, title, imgUrl, releaseDate, directorName, creatorName, rating }: MovieCardProps) => {
  return (
    <Link href={`/review/${id}`} passHref legacyBehavior>
      <StyledCard>
        <StyledCardMedia>
          <StyledImage src={imgUrl || ""} alt={`${title} poster`} layout="fill" />
        </StyledCardMedia>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            <Chip label={new Date(releaseDate).toLocaleDateString()} size="small" />
          </Box>
          <Rating value={rating} readOnly precision={0.5} />
          <Box mt="auto">
            <Typography variant="body2" color="text.secondary">
              Director: {directorName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created By: {creatorName}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </Link>
  );
}; 