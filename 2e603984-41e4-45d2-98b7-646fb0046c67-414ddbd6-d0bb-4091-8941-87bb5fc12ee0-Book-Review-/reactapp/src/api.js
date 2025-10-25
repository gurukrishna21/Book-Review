import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(`${API_BASE_URL}/books`, book);
  return response.data;
};

export const getReviews = async (bookId) => {
  const response = await axios.get(`${API_BASE_URL}/reviews?bookId=${bookId}`);
  return response.data;
};

export const addReview = async (review) => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, review);
  return response.data;
};