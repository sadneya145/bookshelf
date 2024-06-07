import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = ({ addToBookshelf }) => {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedBooks = localStorage.getItem('randomBooks');
        if (cachedBooks) {
          setRandomBooks(JSON.parse(cachedBooks));
          setLoading(false);
          return;
        }

        const response = await fetch('https://openlibrary.org/search.json?q=random&limit=50');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const shuffledBooks = data.docs.sort(() => 0.5 - Math.random());
        const selectedBooks = shuffledBooks.slice(0, 10);
        setRandomBooks(selectedBooks);
        localStorage.setItem('randomBooks', JSON.stringify(selectedBooks));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <h2><i>Hola Folks</i> </h2>
      <div className="results-container">
        {randomBooks.map((book) => (
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

export default HomePage;
