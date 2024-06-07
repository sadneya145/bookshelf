import React from 'react';
import './BookshelfPage.css';

const BookshelfPage = ({ bookshelf, removeFromBookshelf }) => {
  return (
    <div className="bookshelf-page">
      <h2>My Bookshelf</h2>
      <div className="bookshelf-container">
        {bookshelf.map((book, index) => (
          <div key={index} className="card">
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
            <button onClick={() => removeFromBookshelf(index)}>Remove from Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
