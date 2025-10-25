// File: src/__tests__/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as apiService from '../api';

jest.mock('../api');

const mockBooks = [
  { id: 1, title: 'Book A', author: 'Author A', genre: 'Fiction', description: 'Desc A', averageRating: 4 },
  { id: 2, title: 'Book B', author: 'Author B', genre: 'Non-fiction', description: 'Desc B', averageRating: 5 }
];

const mockNewBook = { id: 3, title: 'Book C', author: 'Author C', genre: 'Sci-fi', description: 'Desc C' };

describe('Book Review & Rating Platform - Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    apiService.getBooks.mockResolvedValue(mockBooks);
    apiService.addBook.mockResolvedValue(mockNewBook);
    apiService.addReview.mockResolvedValue({});
  });
  // 2 ✅ Creates new book and refreshes list
  test('React_APIIntegration_TestingAndAPIDocumentation_creates new book and updates list', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Book C' } });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), { target: { value: 'Author C' } });
    fireEvent.change(screen.getByPlaceholderText(/Genre/i), { target: { value: 'Sci-fi' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Desc C' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() => expect(apiService.addBook).toHaveBeenCalledWith({
      title: 'Book C',
      author: 'Author C',
      genre: 'Sci-fi',
      description: 'Desc C'
    }));
    await waitFor(() => expect(apiService.getBooks).toHaveBeenCalledTimes(2));
  });

  // 3 ✅ Renders book table headers
  test('React_BuildUIComponents_renders book table headers', async () => {
    render(<App />);
    expect(await screen.findByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Author/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Rating/i)).toBeInTheDocument();
  });

  // 4 ✅ Book form input updates state
  test('React_BuildUIComponents_book form input updates state', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Title/i);
    fireEvent.change(input, { target: { value: 'My Book' } });
    expect(input.value).toBe('My Book');
  });

  // 5 ✅ Does not call addBook if form empty
  test('React_BuildUIComponents_does not call addBook if form is empty', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));
    expect(apiService.addBook).not.toHaveBeenCalled();
  });

  // 6 ✅ Clears form after successful add
  test('React_BuildUIComponents_clears form after adding book', async () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Book C' } });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), { target: { value: 'Author C' } });
    fireEvent.change(screen.getByPlaceholderText(/Genre/i), { target: { value: 'Sci-fi' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Desc C' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));
    await waitFor(() => expect(titleInput.value).toBe(''));
  });

  // 7 ✅ Renders "No reviews yet" if no rating
  test('React_UITestingAndResponsivenessFixes_renders No reviews yet when no averageRating', async () => {
    apiService.getBooks.mockResolvedValue([{ id: 1, title: 'Book X', author: 'Author X', genre: 'Drama', description: 'Desc X' }]);
    render(<App />);
    expect(await screen.findByText(/No reviews yet/i)).toBeInTheDocument();
  });



  // 10 ✅ Does not call addReview if form is empty
  test('React_BuildUIComponents_does not call addReview if form empty', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /Add Review/i }));
    expect(apiService.addReview).not.toHaveBeenCalled();
  });
 // 12 ✅ Works when book list is empty
  test('React_BuildUIComponents_renders empty book list correctly', async () => {
    apiService.getBooks.mockResolvedValue([]);
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText('Book A')).not.toBeInTheDocument();
    });
  });
  // 14 ✅ Handles API error gracefully
  test('React_UITestingAndResponsivenessFixes_handles API error gracefully', async () => {
    apiService.getBooks.mockRejectedValue(new Error('API Error'));
    render(<App />);
    await waitFor(() => {
      // No crash - could add error message check if implemented
      expect(screen.getByText(/Book Review App/i)).toBeInTheDocument();
    });
  });

  // 15 ✅ Allows entering numeric rating only
  test('React_BuildUIComponents_rating input accepts numbers', async () => {
    render(<App />);
    const ratingInput = await screen.findByPlaceholderText(/Rating/i);
    fireEvent.change(ratingInput, { target: { value: '3' } });
    expect(ratingInput.value).toBe('3');
  });
});
