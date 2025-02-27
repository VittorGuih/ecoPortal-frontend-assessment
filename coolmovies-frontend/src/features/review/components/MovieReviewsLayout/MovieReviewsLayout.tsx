import { Container, Typography, Grid } from "@mui/material";

interface MovieReviewsLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const MovieReviewsLayout = ({ title, children }: MovieReviewsLayoutProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        {title}
      </Typography>
      <Grid container spacing={4}>
        {children}
      </Grid>
    </Container>
  );
}; 