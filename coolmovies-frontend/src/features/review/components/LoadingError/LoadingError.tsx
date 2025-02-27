import { Typography } from "@mui/material";

interface LoadingErrorProps {
  loading: boolean;
  error?: Error;
}

export const LoadingError = ({ loading, error }: LoadingErrorProps) => {
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  return null;
}; 