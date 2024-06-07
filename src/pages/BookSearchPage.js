import React, { useState } from 'react';
import './BookSearchPage.css';

const BookSearchPage = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    if (query.length > 2) {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      const data = await response.json();
      setResults(data.docs);
    } else {
      setResults([]);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length <= 2) {
      setResults([]);
    }
  };

  return (
    <div className="book-search-page">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="search-input"
      />
      <button onClick={searchBooks} className="search-button">Search</button>
      <div className="results-container">
        {results.map((book) => (
          <div key={book.key} className="card">
            {book.cover_i ? (
              <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} 
                alt={`${book.title} cover`}
                className="book-cover"
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
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
