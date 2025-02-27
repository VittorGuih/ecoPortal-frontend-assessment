import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './types';

interface ReviewState {
  allMovies: {
    reviews: Movie[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: ReviewState = {
  allMovies: {
    reviews: [],
    loading: false,
    error: null,
  },
};

export const reviewSlice = createSlice({
  name: 'Review',
  initialState,
  reducers: {
    fetch: (state) => {
      state.allMovies.loading = true;
      state.allMovies.error = null;
    },
    clearData: (state) => {
      state.allMovies.reviews = [];
      state.allMovies.loading = false;
      state.allMovies.error = null;
    },
    loaded: (state, action: PayloadAction<{ data: Movie[] }>) => {
      state.allMovies.reviews = action.payload.data;
      state.allMovies.loading = false;
    },
    loadError: (state) => {
      state.allMovies.error = 'Error Fetching :(';
      state.allMovies.loading = false;
    },
  },
});

export const { actions } = reviewSlice;
export type SliceAction = typeof actions;
export default reviewSlice.reducer;
