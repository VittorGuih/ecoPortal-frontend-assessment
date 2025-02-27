import { Box, Typography, Button, List, ListItem, Card, CardContent, Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Review {
  id: string;
  title: string;
  body: string;
  rating: number;
  userByUserReviewerId?: {
    name: string;
  };
}

interface ReviewsListProps {
  reviews: Review[];
  onAddReview: () => void;
}

export const ReviewsList = ({ reviews, onAddReview }: ReviewsListProps) => (
  <Box mt={4}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h4" component="h2">Reviews</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />} 
        onClick={onAddReview}
      >
        Add Review
      </Button>
    </Box>
    <List>
      {reviews.map((review) => (
        <ListItem key={review.id}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" component="h3">
                  {review.title}
                </Typography>
                <Rating value={review.rating} readOnly precision={0.5} />
              </Box>
              <Typography variant="body2" color="text.secondary">{review.body}</Typography>
              {review.userByUserReviewerId && (
                <Typography variant="caption" color="text.secondary">
                  Reviewed by: {review.userByUserReviewerId.name}
                </Typography>
              )}
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  </Box>
); 