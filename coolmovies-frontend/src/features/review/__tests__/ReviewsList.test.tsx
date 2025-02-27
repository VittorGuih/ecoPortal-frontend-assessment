import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReviewsList } from '../components/ReviewsList/ReviewsList';

const mockReviews = [
  {
    id: '1',
    title: 'Great Movie',
    body: 'This is a great movie review',
    rating: 4.5,
    userByUserReviewerId: {
      name: 'John Doe'
    }
  }
];

describe('ReviewsList', () => {
  const mockOnAddReview = jest.fn();

  it('renders reviews correctly', () => {
    render(<ReviewsList reviews={mockReviews} onAddReview={mockOnAddReview} />);
    
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Great Movie')).toBeInTheDocument();
    expect(screen.getByText('This is a great movie review')).toBeInTheDocument();
    expect(screen.getByText('Reviewed by: John Doe')).toBeInTheDocument();
  });

  it('renders add review button', () => {
    render(<ReviewsList reviews={mockReviews} onAddReview={mockOnAddReview} />);
    
    const addButton = screen.getByText('Add New Review');
    expect(addButton).toBeInTheDocument();
  });

  it('calls onAddReview when add button is clicked', () => {
    render(<ReviewsList reviews={mockReviews} onAddReview={mockOnAddReview} />);
    
    const addButton = screen.getByText('Add New Review');
    addButton.click();
    expect(mockOnAddReview).toHaveBeenCalled();
  });
}); 