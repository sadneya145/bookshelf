import React from 'react';
import './BookshelfPage.css';

const BookshelfPage = ({ bookshelf, removeFromBookshelf }) => {
  return (
    <div className="bookshelf-page">
      {/* Header Section */}
      <div className="bookshelf-header">
        <div className="header-content">
          <h1 className="page-title">My Personal Bookshelf</h1>
          <p className="page-subtitle">
            {bookshelf.length === 0 
              ? "Your bookshelf is empty. Start adding some amazing books!" 
              : `You have ${bookshelf.length} book${bookshelf.length !== 1 ? 's' : ''} in your collection`
            }
          </p>
          <div className="header-divider"></div>
        </div>
      </div>

      {/* Bookshelf Content */}
      <div className="bookshelf-content">
        {bookshelf.length === 0 ? (
          <div className="empty-shelf">
            <div className="empty-shelf-icon">📚</div>
            <h3 className="empty-title">Your bookshelf awaits</h3>
            <p className="empty-text">Start building your personal library by adding books from the home page!</p>
          </div>
        ) : (
          <div className="shelf-container">
            {/* Shelf Background */}
            <div className="shelf-background">
              <div className="shelf-wood"></div>
            </div>
            
            {/* Books Grid */}
            <div className="books-grid">
              {bookshelf.map((book, index) => (
                <div 
                  key={index} 
                  className="book-spine"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    '--book-color': `hsl(${(index * 60) % 360}, 70%, 60%)`
                  }}
                >
                  {/* Book spine design */}
                  <div className="spine-content">
                    <div className="spine-title">{book.title}</div>
                    <div className="spine-author">
                      {book.author_name ? book.author_name[0] : 'Unknown'}
                    </div>
                  </div>
                  
                  {/* Book details (appears on hover) */}
                  <div className="book-details">
                    <div className="book-cover-container">
                      {book.cover_i ? (
                        <img 
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} 
                          alt={`${book.title} cover`}
                          className="book-cover"
                        />
                      ) : (
                        <div className="no-cover">
                          <div className="no-cover-content">
                            <div className="book-icon">📖</div>
                            <p className="no-cover-text">No Cover</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="book-info">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">
                        {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromBookshelf(index)}
                      className="remove-button"
                    >
                      <span className="button-content">
                        <span>Remove</span>
                        <span className="button-icon">🗑️</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookshelfPage;