import React, { useState, useEffect } from "react";

const BookCard = ({ book, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.key === book.key));

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    if (savedRatings[book.key]) {
      setRating(savedRatings[book.key]);
    }
  }, [book.key]);

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.key !== book.key);
    } else {
      savedFavorites.push(book);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);

    if (onToggle) onToggle();
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    let savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    savedRatings[book.key] = newRating;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  };

  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      {/* Favorite Button */}
      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
      </button>

      {/* Rating System */}
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "20px",
            }}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
