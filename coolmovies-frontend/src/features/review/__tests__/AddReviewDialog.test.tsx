import { render, screen, fireEvent } from '@testing-library/react';
import { AddReviewDialog } from '../components/AddReviewDialog/AddReviewDialog';
import '@testing-library/jest-dom';

describe('AddReviewDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOnReviewChange = jest.fn();
  const mockReview = {
    title: '',
    body: '',
    rating: 0
  };

  it('calls onReviewChange when fields are updated', () => {
    render(
      <AddReviewDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        review={mockReview}
        onReviewChange={mockOnReviewChange}
      />
    );

    const titleInput = screen.getByLabelText('Review Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    expect(mockOnReviewChange).toHaveBeenCalledWith('title', 'New Title');
  });

  it('calls onSubmit when Add Review button is clicked', () => {
    render(
      <AddReviewDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        review={mockReview}
        onReviewChange={mockOnReviewChange}
      />
    );

    const submitButton = screen.getByText('Add Review');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
}); 