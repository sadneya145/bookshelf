import React, { useState } from 'react';
import './BookSearchPage.css';
import debounce from 'lodash/debounce';

const BookSearchPage = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchBooks = debounce(async (value) => {
    if (value.length > 2) {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${value}&limit=12&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        if (data.docs.length === 0) {
          setError('No books found. Try a different search term.');
          setResults([]);
        } else {
          setResults(data.docs);
          setError('');
        }
      } catch (err) {
        setError('An error occurred while searching. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setError('');
      setResults([]);
      setLoading(false);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchBooks(value);
  };

  const handleAddToBookshelf = (book) => {
    addToBookshelf(book);
    // Optional: Show a brief success message
  };

  return (
    <div className="book-search-page">
      {/* Header Section */}
      <div className="search-header">
        <div className="header-content">
          <h1 className="page-title">Discover Books</h1>
          <p className="page-subtitle">
            Search through millions of books and build your personal library
          </p>
          <div className="header-divider"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for books by title, author, or keyword..."
              className="search-input"
            />
            {loading && <div className="loading-spinner">⏳</div>}
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        {query.length > 0 && !loading && results.length === 0 && !error && query.length <= 2 && (
          <div className="search-hint">
            <div className="hint-icon">💡</div>
            <p>Type at least 3 characters to start searching</p>
          </div>
        )}

        <div className="results-container">
          {results.map((book, index) => (
            <div 
              key={book.key} 
              className="book-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="book-cover-section">
                {book.cover_i ? (
                  <img 
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                    alt={`${book.title} cover`}
                    className="book-cover"
                  />
                ) : (
                  <div className="no-cover">
                    <div className="book-icon">📚</div>
                    <p className="no-cover-text">No Cover</p>
                  </div>
                )}
              </div>
              
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">
                  {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                </p>
                
                <div className="book-meta">
                  {book.first_publish_year && (
                    <span className="publish-year">📅 {book.first_publish_year}</span>
                  )}
                  {book.subject && book.subject.length > 0 && (
                    <span className="genre">🏷️ {book.subject[0]}</span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => handleAddToBookshelf(book)}
                className="add-button"
              >
                <span className="button-content">
                  <span className="button-icon">📖</span>
                  <span>Add to Bookshelf</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearchPage;