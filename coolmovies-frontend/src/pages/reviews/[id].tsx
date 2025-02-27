"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetMovieByIdQuery, useCreateMovieReviewMutation, useCurrentUserQuery } from "../../generated/graphql";
import { MovieDetailsHeader } from "../../features/review/components/MovieDetailsHeader/MovieDetailsHeader";
import { ReviewsList } from "../../features/review/components/ReviewsList/ReviewsList";
import { AddReviewDialog } from "../../features/review/components/AddReviewDialog/AddReviewDialog";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [openDialog, setOpenDialog] = useState(false);
  const [newReview, setNewReview] = useState({ title: "", body: "", rating: 0 });
  const [reviews, setReviews] = useState<any[]>([]);

  const { data, loading, error, refetch } = useGetMovieByIdQuery({
    variables: { id: id as string },
    skip: !id,
  });

  const { data: currentUser, loading: currentUserLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (data?.movieById?.movieReviewsByMovieId?.nodes) {
      setReviews(data.movieById.movieReviewsByMovieId.nodes);
    }
  }, [data]);

  const [createReview] = useCreateMovieReviewMutation({
    onCompleted: (data) => {
      if (data.createMovieReview?.movieReview) {
        setReviews((prevReviews) => [data.createMovieReview!.movieReview!, ...prevReviews]);
      }
      refetch();
      handleCloseDialog();
    },
    onError: (error) => {
      console.error("Erro ao criar review:", error);
      alert("Falha ao criar review.");
    },
  });

  if (!id || loading || currentUserLoading) return <Typography>Carregando...</Typography>;
  if (error || !data?.movieById) return <Typography>Erro ao carregar filme.</Typography>;

  const movie = data.movieById;
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + (review?.rating || 0), 0) / reviews.length
    : 0;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewReview({ title: "", body: "", rating: 0 });
  };

  const handleGoBack = () => router.back();

  const handleAddReview = () => {
    if (newReview.title && newReview.body && newReview.rating > 0) {
      createReview({
        variables: {
          input: {
            movieReview: {
              title: newReview.title,
              body: newReview.body,
              rating: newReview.rating,
              movieId: id as string,
              userReviewerId: currentUser?.currentUser?.id,
            },
          },
        },
      });
    }
  };

  const handleReviewChange = (field: string, value: string | number) => {
    setNewReview((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton onClick={handleGoBack} aria-label="voltar" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1">
          Detalhes do Filme
        </Typography>
      </Box>

      <MovieDetailsHeader 
        movie={{
          ...movie,
          movieDirectorByMovieDirectorId: movie.movieDirectorByMovieDirectorId || undefined,
          userByUserCreatorId: movie.userByUserCreatorId || undefined
        }} 
        averageRating={averageRating} 
      />
      
      <ReviewsList reviews={reviews} onAddReview={handleOpenDialog} />

      <AddReviewDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleAddReview}
        review={newReview}
        onReviewChange={handleReviewChange}
      />
    </Container>
  );
}
