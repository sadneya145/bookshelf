import React, { useState } from 'react';
import './BookSearchPage.css';
import debounce from 'lodash/debounce';

const BookSearchPage = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchBooks = debounce(async (value) => {
    if (value.length > 2) {
      const response = await fetch(`https://openlibrary.org/search.json?q=${value}&limit=10&page=1`);
      if (!response.ok) {
        setError('An error occurred while fetching data. Please try again.');
        setResults([]);
        return;
      }
      const data = await response.json();
      if (data.docs.length === 0) {
        setError('Book not found. Please try another search term.');
        setResults([]);
      } else {
        setResults(data.docs);
        setError('');
      }
    } else {
      setError('');
      setResults([]);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchBooks(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="search-input"
      />
      {error && <div className="error-message">{error}</div>}
      <div className="results-container">
        {results.map((book) => (
          <div key={book.key} className="card">
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
