interface MovieReview {
    id: string;
    rating: number;
  }
  
  interface MovieReviewEdge {
    node: MovieReview;
  }
  
  interface MovieReviewsConnection {
    edges: MovieReviewEdge[];
  }
  
  interface MovieDirector {
    name: string;
  }
  
  interface User {
    name: string;
  }
  
  export interface Movie {
    id: string;
    imgUrl: string;
    title: string;
    releaseDate: string;
    movieDirectorByMovieDirectorId: MovieDirector;
    movieReviewsByMovieId: MovieReviewsConnection;
    userByUserCreatorId: User;
  }