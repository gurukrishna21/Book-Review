import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, addBook } from '../api';

export default function Dashboard(){
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books: ' + err.message);
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addBook(newBook);
      setNewBook({ title: '', author: '', description: '' });
      fetchBooks();
    } catch (err) {
      setError('Failed to add book: ' + err.message);
    }
  };

  return (
    <div className="dashboard" style={{padding:20}}>
      <h2>Dashboard</h2>
      <p>Welcome to the Book Review Dashboard</p>

      {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}

      <section style={{marginBottom: 30}}>
        <h3>Add New Book</h3>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            required
            style={{margin: 5, padding: 5}}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            required
            style={{margin: 5, padding: 5}}
          />
          <input
            type="text"
            placeholder="Description"
            value={newBook.description}
            onChange={(e) => setNewBook({...newBook, description: e.target.value})}
            style={{margin: 5, padding: 5}}
          />
          <button type="submit" style={{margin: 5, padding: 5}}>Add Book</button>
        </form>
      </section>

      <section>
        <h3>Books ({books.length})</h3>
        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p>No books found. Add some books above!</p>
        ) : (
          <ul>
            {books.map(book => (
              <li key={book.id} style={{marginBottom: 10}}>
                <strong>{book.title}</strong> by {book.author}
                <br />
                <small>{book.description}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
}
