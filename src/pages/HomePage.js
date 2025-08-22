import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = ({ addToBookshelf }) => {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedBooks, setLikedBooks] = useState(() => {
    const savedLikes = localStorage.getItem("likedBooks");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedBooks = localStorage.getItem("randomBooks");
        if (cachedBooks) {
          setRandomBooks(JSON.parse(cachedBooks));
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://openlibrary.org/search.json?q=fiction&limit=50"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const shuffledBooks = data.docs.sort(() => 0.5 - Math.random());
        const selectedBooks = shuffledBooks.slice(0, 10);
        setRandomBooks(selectedBooks);
        localStorage.setItem("randomBooks", JSON.stringify(selectedBooks));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem("likedBooks", JSON.stringify(likedBooks));
  }, [likedBooks]);

  const toggleLike = (bookKey) => {
    setLikedBooks((prev) =>
      prev.includes(bookKey)
        ? prev.filter((id) => id !== bookKey)
        : [...prev, bookKey]
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Discovering amazing books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-text">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <i>Hola! Geeky Readers</i>
          </h1>
          <p className="hero-subtitle">
            Discover your next favorite book from our curated collection of
            literary masterpieces
          </p>
          <div className="hero-divider"></div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-section">
        <div className="books-container">
          <div className="books-grid">
            {randomBooks.map((book, index) => {
              const isLiked = likedBooks.includes(book.key);
              return (
                <div
                  key={book.key}
                  className="book-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Book Cover */}
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
                          <div className="book-icon">📚</div>
                          <p className="no-cover-text">No Cover</p>
                        </div>
                      </div>
                    )}
                    <div className="book-overlay"></div>
                  </div>

                  {/* Book Info */}
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown Author"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="book-actions">
                    <button
                      onClick={() => addToBookshelf(book)}
                      className="add-button"
                    >
                      <span className="button-content">
                        <span>Add to Bookshelf</span>
                        <span className="button-icon">📖</span>
                      </span>
                    </button>

                    <button
                      onClick={() => toggleLike(book.key)}
                      className={`like-button ${isLiked ? "liked" : ""}`}
                    >
                      {isLiked ? "❤️ Liked" : "🤍 Like"}
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="decoration-1"></div>
                  <div className="decoration-2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
