import reducer, { actions } from '../state/slice';

describe('Review Slice', () => {
  const initialState = {
    allMovies: {
      reviews: [],
      loading: false,
      error: null,
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetch action', () => {
    const nextState = reducer(initialState, actions.fetch());
    expect(nextState.allMovies.loading).toBe(true);
    expect(nextState.allMovies.error).toBe(null);
  });

  it('should handle loaded action', () => {
    const mockMovies = [
      {
        id: '1',
        title: 'Test Movie',
        imgUrl: 'test.jpg',
        releaseDate: '2024-03-20',
        movieDirectorByMovieDirectorId: { name: 'Director' },
        movieReviewsByMovieId: { edges: [] },
        userByUserCreatorId: { name: 'Creator' }
      }
    ];

    const nextState = reducer(
      { ...initialState, allMovies: { ...initialState.allMovies, loading: true } },
      actions.loaded({ data: mockMovies })
    );

    expect(nextState.allMovies.loading).toBe(false);
    expect(nextState.allMovies.reviews).toEqual(mockMovies);
  });

  it('should handle loadError action', () => {
    const nextState = reducer(
      { ...initialState, allMovies: { ...initialState.allMovies, loading: true } },
      actions.loadError()
    );

    expect(nextState.allMovies.loading).toBe(false);
    expect(nextState.allMovies.error).toBe('Error Fetching :(');
  });

  it('should handle clearData action', () => {
    const stateWithData = {
      allMovies: {
        reviews: [{
          id: '1',
          title: 'Test Movie',
          imgUrl: 'test.jpg',
          releaseDate: '2024-03-20',
          movieDirectorByMovieDirectorId: { name: 'Director' },
          movieReviewsByMovieId: { edges: [] },
          userByUserCreatorId: { name: 'Creator' }
        }],
        loading: true,
        error: 'Some error',
      },
    };

    const nextState = reducer(stateWithData, actions.clearData());
    expect(nextState).toEqual(initialState);
  });
}); 