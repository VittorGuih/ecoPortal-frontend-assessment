import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography, Rating, Button } from "@mui/material";

interface AddReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  review: {
    title: string;
    body: string;
    rating: number;
  };
  onReviewChange: (field: string, value: string | number) => void;
}

export const AddReviewDialog = ({ open, onClose, onSubmit, review, onReviewChange }: AddReviewDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add Review</DialogTitle>
    <DialogContent>
      <TextField 
        autoFocus 
        margin="dense" 
        label="Review Title" 
        type="text" 
        fullWidth 
        variant="outlined"
        value={review.title} 
        onChange={(e: any) => onReviewChange('title', e.target.value)} 
      />
      <Box display="flex" alignItems="center" mt={2} mb={1}>
        <Typography component="legend">Your Rating:</Typography>
        <Rating 
          name="review-rating" 
          value={review.rating} 
          onChange={(_: any, value: number) => onReviewChange('rating', value || 0)} 
          precision={1} 
        />
      </Box>
      <TextField 
        margin="dense" 
        label="Your Review" 
        type="text" 
        fullWidth 
        variant="outlined" 
        multiline 
        rows={4}
        value={review.body} 
        onChange={(e: any) => onReviewChange('body', e.target.value)} 
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSubmit} variant="contained" color="primary">Add Review</Button>
    </DialogActions>
  </Dialog>
); 